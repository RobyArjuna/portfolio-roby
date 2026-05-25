/**
 * @typedef {'user' | 'assistant' | 'system'} ChatRole
 *
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {ChatRole} role
 * @property {string} content
 * @property {string} createdAt
 * @property {boolean=} pending
 * @property {string=} error
 *
 * @typedef {Object} ChatChunk
 * @property {'meta' | 'delta' | 'done' | 'error'} type
 * @property {string=} text
 * @property {string=} message
 * @property {number=} contextCount
 */

export {};
