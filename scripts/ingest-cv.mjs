import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import process from 'node:process';
import { PDFParse } from 'pdf-parse';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const CV_PATH = process.env.CV_PATH;
const CV_URL = process.env.CV_URL;
const PROFILE_CONTEXT_PATH = process.env.PROFILE_CONTEXT_PATH || 'src/ai/rag/profileContext.md';
const CHUNK_SIZE = Number(process.env.CHUNK_SIZE || 700);
const CHUNK_OVERLAP = Number(process.env.CHUNK_OVERLAP || 100);
const EMBEDDING_MODEL = process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-2';
const EMBEDDING_DIMENSIONS = Number(process.env.GEMINI_EMBEDDING_DIMENSIONS || 768);
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const required = {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  GEMINI_API_KEY,
};

for (const [key, value] of Object.entries(required)) {
  if (!value) {
    throw new Error(`${key} is required. Set it in .env.local or your shell before running ingestion.`);
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function normalizeText(value) {
  return String(value || '')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function chunkText(text) {
  const chunks = [];
  let index = 0;

  while (index < text.length) {
    const end = Math.min(index + CHUNK_SIZE, text.length);
    const chunk = text.slice(index, end).trim();
    if (chunk.length > 80) chunks.push(chunk);
    if (end >= text.length) break;
    index = Math.max(0, end - CHUNK_OVERLAP);
  }

  return chunks;
}

async function embedText(text) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        output_dimensionality: EMBEDDING_DIMENSIONS,
        content: {
          parts: [{ text }],
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini embedding failed: ${await response.text()}`);
  }

  const payload = await response.json();
  const values = payload?.embedding?.values || payload?.embeddings?.[0]?.values;
  if (!Array.isArray(values)) {
    throw new Error('Gemini embedding response did not include embedding values.');
  }
  return values;
}

async function ingestDocument({ sourceType, sourceName, text, metadata, replaceSourceType = false }) {
  const chunks = chunkText(text);

  const deleteQuery = supabase.from('ai_documents').delete().eq('source_type', sourceType);
  if (!replaceSourceType) {
    deleteQuery.eq('source_name', sourceName);
  }
  const { error: deleteError } = await deleteQuery;
  if (deleteError) throw deleteError;

  const { data: document, error: documentError } = await supabase
    .from('ai_documents')
    .insert({
      source_type: sourceType,
      source_name: sourceName,
      metadata: {
        ...metadata,
        characters: text.length,
        chunks: chunks.length,
      },
    })
    .select('id')
    .single();

  if (documentError) throw documentError;

  for (const [chunkIndex, content] of chunks.entries()) {
    const embedding = await embedText(content);
    const contentHash = crypto.createHash('sha256').update(content).digest('hex');

    const { error } = await supabase.from('ai_profile_chunks').upsert(
      {
        document_id: document.id,
        chunk_index: chunkIndex,
        content,
        content_hash: contentHash,
        token_estimate: Math.ceil(content.length / 4),
        metadata: {
          source: sourceType,
          source_name: sourceName,
        },
        embedding,
      },
      { onConflict: 'document_id,content_hash' },
    );

    if (error) throw error;
    console.log(`Indexed ${sourceName} chunk ${chunkIndex + 1}/${chunks.length}`);
  }

  console.log(`Done. Indexed ${chunks.length} chunks from ${sourceName}.`);
}

async function getResumeUrlFromSiteConfig() {
  const { data, error } = await supabase.from('site_config').select('resume_url').single();
  if (error) throw error;

  const resumeUrl = data?.resume_url?.trim();
  if (!resumeUrl) {
    throw new Error('site_config.resume_url is empty. Add a public CV PDF URL or set CV_PATH/CV_URL.');
  }

  return resumeUrl;
}

async function readPdfFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download CV PDF from ${url}: ${response.status} ${response.statusText}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

function getFileNameFromUrl(url) {
  try {
    const { pathname } = new URL(url);
    const fileName = path.basename(decodeURIComponent(pathname));
    return fileName || 'resume.pdf';
  } catch {
    return 'resume.pdf';
  }
}

async function parsePdfBuffer(pdfBuffer) {
  const parser = new PDFParse({ data: pdfBuffer });
  const parsed = await parser.getText();
  await parser.destroy();

  return normalizeText(parsed.text);
}

async function parseCvText() {
  if (CV_PATH) {
    const absolutePath = path.resolve(CV_PATH);
    const pdfBuffer = await fs.readFile(absolutePath);
    return {
      sourceName: path.basename(absolutePath),
      text: await parsePdfBuffer(pdfBuffer),
      metadata: {
        path: CV_PATH,
      },
    };
  }

  const resumeUrl = CV_URL || await getResumeUrlFromSiteConfig();
  const pdfBuffer = await readPdfFromUrl(resumeUrl);
  return {
    sourceName: getFileNameFromUrl(resumeUrl),
    text: await parsePdfBuffer(pdfBuffer),
    metadata: {
      url: resumeUrl,
      source: CV_URL ? 'CV_URL' : 'site_config.resume_url',
    },
  };
}

async function main() {
  const cv = await parseCvText();
  await ingestDocument({
    sourceType: 'cv_pdf',
    sourceName: cv.sourceName,
    text: cv.text,
    metadata: cv.metadata,
    replaceSourceType: true,
  });

  const profileContextPath = path.resolve(PROFILE_CONTEXT_PATH);
  const profileContext = normalizeText(await fs.readFile(profileContextPath, 'utf8'));
  await ingestDocument({
    sourceType: 'profile_context',
    sourceName: path.basename(profileContextPath),
    text: profileContext,
    metadata: {
      path: PROFILE_CONTEXT_PATH,
    },
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
