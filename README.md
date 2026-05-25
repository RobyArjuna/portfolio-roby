# 🌐 Roby Arjuna - Professional Portfolio & Dynamic Dashboard

A highly dynamic, premium, and fully responsive developer portfolio built with **React.js** and **Tailwind CSS**, integrated with a **Supabase Real-time Database** for dynamic content delivery.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

---

## 💻 Web Portfolio Tech Stack

The core architecture of this portfolio is designed to be dynamic, real-time, and modern:

* **Frontend Engine:** **React.js** (v18.3.1) bootstrapped via Create React App.
* **Styling & Theme:** **Tailwind CSS** (v3.4.15) for responsive utilities, with custom **Cyber-Glassmorphism** styling (mesh auroras, dark-space themes `#050814`, and smooth neon glows).
* **Database & Real-time BaaS:** **Supabase** for serving project, skills, and configuration data dynamically, utilizing **Supabase Realtime Channel** listeners for instantaneous UI synchronization.
* **Animations:** 
  * **AOS (Animate on Scroll):** Scroll-based entry transitions.
  * **React Type Animation:** Dynamic typing subtitle effect.
  * **React Intersection Observer:** Custom viewport trigger handlers.
* **Navigation:** **React Scroll** for smooth page section transitions.
* **Interactions & Components:** **React Slick** for premium image/project sliders, **React Icons** for modular typography assets.
* **Form Handling:** Direct POST submission integration with **Getform.io**.

---

# 👤 DEVELOPER PROFILE (CONTENT SPECS)

This section documents the exact, verified professional content of Roby Arjuna. **AI or Developers should use this section to drive the context, images, colors, and layout aesthetics of the design overhaul.**

### 📝 About the Developer
* **Name**: Roby Arjuna (Robi Arjuna Wijaya)
* **Title**: Software Engineer / Web & Mobile Developer / Machine Learning Enthusiast
* **Location**: Surabaya, Jawa Timur, Indonesia
* **Core Philosophy**: 
  * Strongly focused on software development using ** Waterfall** and **Agile** methodologies under the **Scrum** framework to optimize team effectiveness and delivery speed.
  * Committed to **Clean Code** principles for maximum maintainability and legibility.
  * Employs advanced **Design Patterns** to solve complex software architecture and state-management problems.

---

### 📂 Projects Content Directory

These are the exact projects fetched dynamically from the database or configured in the fallback code. Designs should create specific visuals and badge styles tailored to these technologies:

#### 1. Agile PdBL : Mealty App
* **Description**: A cutting-edge mobile application designed to manage and visualize dietary insights. Built to ensure smooth transitions, dynamic layouts, and real-time updates.
* **Core Technology Stack**: `Flutter` (Dart)
* **Key Links**: [Google Play Store](https://play.google.com/store/apps/details?id=com.development.mealty)
* **Design Cues**: Dynamic mobile layouts, health/diet UI colors, dark/light contrast cards.

#### 2. Agile PdBL : Mealty Website
* **Description**: The official web companion for the Mealty application. Features a cutting-edge dashboard designed for detailed data visualization.
* **Core Technology Stack**: `React.js`, `Vite`, `Tremor Components`, `Tailwind CSS`, `Supabase`
* **Key Links**: [Live Site](https://mealty.agileteknik.com/)
* **Design Cues**: Data-dense widgets, analytical dashboard design, interactive glassmorphic panels.

#### 3. TOEFL PENS
* **Description**: A modern, interactive dashboard application developed for TOEFL practice and score tracking. Features dynamic data visualization for real-time practice insights, optimized state management, and an intuitive, clean interface.
* **Core Technology Stack**: `Flutter`, `Supabase`
* **Key Links**: [GitHub Repo](https://github.com/jhiven/toefl_app)
* **Design Cues**: Academic, blue/slate tone interface, progress meters, analytical score chart components.

#### 4. Bank Indonesia KPW Jatim System Monitoring
* **Description**: A highly secure and robust real-time system monitoring dashboard commissioned by Bank Indonesia (KPW Jawa Timur). Leverages modern web frameworks to render high-throughput system status charts, statistics, and latency metrics dynamically.
* **Core Technology Stack**: `Next.js`, `Tailwind CSS`, `MongoDB`, `Tremor Components`
* **Key Links**: [Live Site](https://mealty.agileteknik.com/)
* **Design Cues**: Institutional, clean, secure look, glowing status indicator pills (green/yellow/red), data density.

#### 5. Kammari POS (Point of Sales)
* **Description**: A simple, lightweight, and highly efficient web-based Point of Sales application designed to help small and medium-sized businesses manage inventory, streamline sales transactions, and track customer data seamlessly.
* **Core Technology Stack**: `Laravel (PHP)`, `MySQL`
* **Key Links**: [GitHub Repo](https://github.com/RobyArjuna/kammari-project)
* **Design Cues**: E-commerce grids, modern inventory receipt look, transaction graphs, red/crimson accents.

#### 6. Real-time Object Detection System
* **Description**: An advanced computer vision system featuring real-time object detection. Trained on a custom-tailored dataset to identify and label target objects in live video streams or static image uploads with maximum throughput and precision.
* **Core Technology Stack**: `Python`, `YOLOv8`, `OpenCV`, `NumPy`
* **Key Links**: [Live Site](https://machinelearning.meetaza.com/)
* **Design Cues**: Dark cyberpunk hacker visual elements, bounding-box overlays, performance latency badges.

---

### ⚡ Technology & Skills Inventory
These are the technologies mapped inside the dynamic backend database:
* **Frontend**: React.js, Next.js, HTML5, CSS3, Tailwind CSS
* **Backend**: Laravel (PHP), Node.js, Express.js
* **Database & BaaS**: MongoDB, PostgreSQL, Supabase
* **Mobile Development**: Flutter (Dart)
* **AI & Machine Learning**: Python, YOLO (Object Detection), OpenCV, NumPy, Metabase (Data Analytics)

---

# 🛠️ PORTFOLIO ARCHITECTURE (FOR DESIGNERS/AI)

### ⚙️ Environment Configuration
The project connects to Supabase using the following environment variables (stored in `.env`):
```env
REACT_APP_SUPABASE_URL=https://gmvyeycwjyxfgbfqdooz.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 🗄️ Database Mapping (Supabase PostgreSQL)
* **Table `site_config`**: Used in `Navbar.jsx` to fetch global contact metrics (`github_url`, `linkedin_url`, `email_address`, `resume_url`).
* **Table `skills`**: Used in `Skills.jsx` to fetch skill lists dynamically (`id`, `name`, `icon_url`, `order`). Has a active **Realtime Channel Listener** to automatically push changes to the browser interface.
* **Table `projects`**: Used in `Work.jsx` & `ShowCard.jsx` to load projects (`id`, `judul`, `desc`, `gambar_url`, `tech`, `link_demo`, `link_github`).

### ✉️ Form Endpoint
The contact form in `Contact.jsx` performs a POST request directly to:
`https://getform.io/f/cba16026-2d63-491a-8ab8-33f0ea8cdcb6`

---

# 🚀 Developer Operations (How to Run)

1. **Install dependencies**: `npm install`
2. **Local Dev Server**: `npm start` (Runs on `http://localhost:3000`)
3. **Production Build**: `npm run build`

---

## 🎨 DESIGN INSPIRATION & DIRECTIONS FOR AI OVERHAUL
When modifying the styles, AI should prioritize:
1. **Cyber-Glassmorphism Dark Theme**: `#050814` deep space primary background with floating aurora mesh particles.
2. **Harmonious Color Codes**:
   - Flutter / Next.js elements: Vivid Cyan neon accent (`#00f2fe`).
   - Laravel / Accent links: Aurora Red accent (`#ff3b30`).
   - Cards: `rgba(11, 17, 37, 0.6)` glass with a `1px` translucent border.
3. **Dynamic Bento Grids**: Structure the 'About Me' text and skills categorization into asymmetrical grids that automatically adjust to mobile screen widths.
4. **Rich Micro-animations**: Glowing outline highlights, soft gradient animations, and smooth sliding transitions for all popup modals.
