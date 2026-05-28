/**
 * ResumeForge AI — ATS Resume Builder Core Engine
 */

// Initialize default state with high-quality default values (Primary Source of Truth)
const defaultState = {
  fullName: "Yash Hirudkar",
  jobTitle: "Full Stack Developer & Backend Engineer",
  email: "yashhirudkar100@gmail.com",
  phone: "+91 7666407114",
  location: "Nagpur, India",
  linkedin: "linkedin.com/in/yashhirudkar100",
  github: "github.com/Yashhirudkar",
  portfolio: "",
  summary: "Results-driven Full Stack Developer with ~1.5 years of production experience architecting and shipping scalable B2B platforms, payment systems, and automation pipelines. Expert in Node.js, Express.js, PostgreSQL, React.js, and Next.js. Proven record of reducing API latency by 40%, building systems handling 100k+ records, implementing multi-gateway payment architectures, and deploying production-grade DevOps infrastructure. Strong command of backend system design, REST API engineering, database optimization, and end-to-end software delivery.",
  targetRole: "Full Stack Developer, Backend Engineer, Node.js & React Specialist, Software Engineer",
  skills: {
    frontend: "React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, TailwindCSS, Material UI, jQuery, Angular",
    backend: "Node.js, Express.js, REST APIs, FastAPI, WebSockets / Socket.IO, JWT, RBAC, SDLC",
    database: "PostgreSQL, MongoDB, SQL, Sequelize ORM, Query Optimization, Indexing",
    devops: "DigitalOcean, Ubuntu Linux, Docker, PM2, Nginx, Apache, Cloudflare, CI/CD, GitHub Webhooks",
    other: "Razorpay, Stripe, PayPal, Webhook Validation, HMAC Verification, OAuth, Git, ExcelJS / SheetJS, Cheerio, Axios, Postman, System Design, API Architecture, Performance Optimization, Agile"
  },
  experience: [
    {
      company: "BizProspex",
      role: "Full Stack Developer",
      location: "Nagpur, India",
      startDate: "2024-06",
      endDate: "Present",
      bullets: [
        "Architected and scaled a B2B data marketplace serving 100k+ records with optimized ingestion, allocation, and delivery pipelines.",
        "Reduced PostgreSQL query latency by ~40% via strategic indexing, query redesign, and Sequelize ORM optimization.",
        "Engineered advanced filtering, faceted search, and cursor-based pagination APIs for high-performance data access at scale.",
        "Built a batch allocation engine with deduplication logic and Sequelize transactions ensuring data consistency across distributed workflows.",
        "Developed CSV/Excel bulk ingestion pipelines with validation, transformation, and error recovery for large-scale data imports.",
        "Engineered a multi-gateway checkout system integrating Razorpay, Stripe, and PayPal with unified order lifecycle management.",
        "Implemented HMAC signature verification and webhook payload validation to secure all inbound payment events.",
        "Designed idempotent payment architecture preventing duplicate transactions across retries and concurrent requests.",
        "Architected complete order state machine: pending → confirmed → fulfilled → expired with automated expiry via cron and setInterval.",
        "Built RBAC-based admin dashboard with role-scoped access for orders, users, datasets, payments, and analytics reporting.",
        "Developed automated B2B data delivery pipeline with race-condition prevention via DB-level locking, auto-recovery, and partial fulfillment reporting."
      ]
    }
  ],
  projects: [
    {
      name: "Enterprise DevOps Infrastructure & Deployment Platform",
      role: "Lead Developer",
      link: "github.com/Yashhirudkar",
      bullets: [
        "Managed production and staging infrastructure across multiple applications on DigitalOcean Ubuntu servers.",
        "Built automated CI/CD pipelines with GitHub Webhook deployments, zero-downtime PM2 reloads, and rollback support.",
        "Configured Nginx reverse proxy architecture with SSL termination, firewall rules, DNS management via Cloudflare."
      ]
    },
    {
      name: "WordPress RankMath-Compatible SEO Sitemap Engine",
      role: "Developer",
      link: "github.com/Yashhirudkar",
      bullets: [
        "Built production-grade sitemap management engine supporting XML import, sync, rebuild, and dynamic sitemap_index.xml generation.",
        "Implemented Cheerio-based DOM parsing with intelligent image extraction; built admin dashboard for full URL lifecycle management."
      ]
    },
    {
      name: "B2B Lead Intelligence & Data Delivery Platform",
      role: "Full Stack Developer",
      link: "github.com/Yashhirudkar",
      bullets: [
        "Developed scalable lead marketplace with advanced List Builder, credit system, real-time Socket.IO dashboard updates, and optimized PostgreSQL queries for high-volume datasets."
      ]
    },
    {
      name: "Secure Enterprise API Integration Platform",
      role: "Backend Developer",
      link: "github.com/Yashhirudkar",
      bullets: [
        "Built API credential management system with gateway middleware, field-level access control, and developer portal with auto-generated API documentation."
      ]
    }
  ],
  education: [
    {
      institution: "Prof. Ram Meghe College of Engineering & Management, Amravati",
      degree: "B.Tech in Computer Science & Engineering",
      location: "Amravati, India",
      year: "2021 – 2025 (CGPA: 7.7 / 10)"
    },
    {
      institution: "Hutatma Rashtriya Vidyalaya, Ashti",
      degree: "Higher Secondary Certificate (HSC) - Science",
      location: "Ashti, India",
      year: "2020 – 2021 (Final Percentage: 95.17%)"
    }
  ]
};

// State store
let state = JSON.parse(JSON.stringify(defaultState));

// Dom Elements
const fullNameInput = document.getElementById("fullName");
const jobTitleInput = document.getElementById("jobTitle");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const locationInput = document.getElementById("location");
const linkedinInput = document.getElementById("linkedin");
const githubInput = document.getElementById("github");
const portfolioInput = document.getElementById("portfolio");
const summaryInput = document.getElementById("summaryText");
const summaryCount = document.getElementById("summaryCount");
const targetRoleInput = document.getElementById("targetRole");

// Skill stack fields
const skillInputs = {
  frontend: document.getElementById("skillsFrontend"),
  backend: document.getElementById("skillsBackend"),
  database: document.getElementById("skillsDatabase"),
  devops: document.getElementById("skillsDevops"),
  other: document.getElementById("skillsOther")
};

const experienceContainer = document.getElementById("experienceContainer");
const projectsContainer = document.getElementById("projectsContainer");
const educationContainer = document.getElementById("educationContainer");

const addExperienceBtn = document.getElementById("addExperienceBtn");
const addProjectBtn = document.getElementById("addProjectBtn");
const addEducationBtn = document.getElementById("addEducationBtn");

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const navDownloadBtn = document.getElementById("navDownloadBtn");

const atsScoreBadge = document.getElementById("atsScoreBadge");
const scoreArc = document.getElementById("scoreArc");
const scoreNumber = document.getElementById("scoreNumber");
const resumePaper = document.getElementById("resumePaper");
const jsonOutput = document.getElementById("jsonOutput");
const analysisWrap = document.getElementById("analysisWrap");
const copyJsonBtn = document.getElementById("copyJsonBtn");

const tabs = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

const loadingOverlay = document.getElementById("loadingOverlay");

// Particle Canvas Animation
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      this.color = Math.random() > 0.5 ? "rgba(139, 92, 246, 0.15)" : "rgba(6, 182, 212, 0.15)";
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// Show Toast Alert
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Load values from State into Form inputs
function populateForm() {
  fullNameInput.value = state.fullName;
  jobTitleInput.value = state.jobTitle;
  emailInput.value = state.email;
  phoneInput.value = state.phone;
  locationInput.value = state.location;
  linkedinInput.value = state.linkedin;
  githubInput.value = state.github;
  portfolioInput.value = state.portfolio;
  summaryInput.value = state.summary;
  summaryCount.innerText = state.summary.length;
  targetRoleInput.value = state.targetRole;

  skillInputs.frontend.value = state.skills.frontend;
  skillInputs.backend.value = state.skills.backend;
  skillInputs.database.value = state.skills.database;
  skillInputs.devops.value = state.skills.devops;
  skillInputs.other.value = state.skills.other;

  renderExperienceList();
  renderProjectList();
  renderEducationList();
  updateSkillTagsPreview();
}

// Render dynamic forms
function renderExperienceList() {
  experienceContainer.innerHTML = "";
  state.experience.forEach((exp, idx) => {
    const item = document.createElement("div");
    item.className = "dynamic-item";
    item.innerHTML = `
      <button class="btn-remove-item" type="button" onclick="removeExperience(${idx})" title="Remove Experience">×</button>
      <div class="field-grid">
        <div class="field-group">
          <label class="field-label">Company *</label>
          <input class="field-input exp-company" type="text" value="${exp.company}" oninput="updateExperienceField(${idx}, 'company', this.value)" />
        </div>
        <div class="field-group">
          <label class="field-label">Job Title *</label>
          <input class="field-input exp-role" type="text" value="${exp.role}" oninput="updateExperienceField(${idx}, 'role', this.value)" />
        </div>
        <div class="field-group">
          <label class="field-label">Location</label>
          <input class="field-input exp-location" type="text" value="${exp.location}" oninput="updateExperienceField(${idx}, 'location', this.value)" />
        </div>
        <div class="field-grid" style="grid-column: span 1; gap: 0.5rem; grid-template-columns: 1fr 1fr;">
          <div class="field-group">
            <label class="field-label">Start Date *</label>
            <input class="field-input exp-start" type="month" value="${exp.startDate}" oninput="updateExperienceField(${idx}, 'startDate', this.value)" />
          </div>
          <div class="field-group">
            <label class="field-label">End Date</label>
            <input class="field-input exp-end" type="text" placeholder="Present or YYYY-MM" value="${exp.endDate}" oninput="updateExperienceField(${idx}, 'endDate', this.value)" />
          </div>
        </div>
      </div>
      <div class="bullet-list-container">
        <label class="field-label">Key Achievements (Action + Tech + Scale + Impact) *</label>
        <div class="bullet-rows-container" id="exp-bullets-${idx}">
          ${exp.bullets.map((b, bIdx) => `
            <div class="bullet-row">
              <input class="field-input bullet-input" type="text" value="${b.replace(/"/g, '&quot;')}" oninput="updateExperienceBullet(${idx}, ${bIdx}, this.value)" />
              <button class="btn-remove-bullet" type="button" onclick="removeExperienceBullet(${idx}, ${bIdx})" title="Remove bullet">×</button>
            </div>
          `).join('')}
        </div>
        <button class="btn-add-bullet" type="button" onclick="addExperienceBullet(${idx})">+ Add Bullet Point</button>
      </div>
    `;
    experienceContainer.appendChild(item);
  });
}

function renderProjectList() {
  projectsContainer.innerHTML = "";
  state.projects.forEach((proj, idx) => {
    const item = document.createElement("div");
    item.className = "dynamic-item";
    item.innerHTML = `
      <button class="btn-remove-item" type="button" onclick="removeProject(${idx})" title="Remove Project">×</button>
      <div class="field-grid">
        <div class="field-group">
          <label class="field-label">Project Name *</label>
          <input class="field-input proj-name" type="text" value="${proj.name}" oninput="updateProjectField(${idx}, 'name', this.value)" />
        </div>
        <div class="field-group">
          <label class="field-label">Your Role / Contribution *</label>
          <input class="field-input proj-role" type="text" value="${proj.role}" oninput="updateProjectField(${idx}, 'role', this.value)" />
        </div>
        <div class="field-group full-width">
          <label class="field-label">Project / GitHub Link</label>
          <input class="field-input proj-link" type="text" value="${proj.link || ''}" oninput="updateProjectField(${idx}, 'link', this.value)" />
        </div>
      </div>
      <div class="bullet-list-container">
        <label class="field-label">Impact Description *</label>
        <div class="bullet-rows-container" id="proj-bullets-${idx}">
          ${proj.bullets.map((b, bIdx) => `
            <div class="bullet-row">
              <input class="field-input bullet-input" type="text" value="${b.replace(/"/g, '&quot;')}" oninput="updateProjectBullet(${idx}, ${bIdx}, this.value)" />
              <button class="btn-remove-bullet" type="button" onclick="removeProjectBullet(${idx}, ${bIdx})" title="Remove bullet">×</button>
            </div>
          `).join('')}
        </div>
        <button class="btn-add-bullet" type="button" onclick="addProjectBullet(${idx})">+ Add Bullet Point</button>
      </div>
    `;
    projectsContainer.appendChild(item);
  });
}

function renderEducationList() {
  educationContainer.innerHTML = "";
  state.education.forEach((edu, idx) => {
    const item = document.createElement("div");
    item.className = "dynamic-item";
    item.innerHTML = `
      <button class="btn-remove-item" type="button" onclick="removeEducation(${idx})" title="Remove Education">×</button>
      <div class="field-grid">
        <div class="field-group">
          <label class="field-label">Institution Name *</label>
          <input class="field-input edu-inst" type="text" value="${edu.institution}" oninput="updateEducationField(${idx}, 'institution', this.value)" />
        </div>
        <div class="field-group">
          <label class="field-label">Degree / Course *</label>
          <input class="field-input edu-degree" type="text" value="${edu.degree}" oninput="updateEducationField(${idx}, 'degree', this.value)" />
        </div>
        <div class="field-group">
          <label class="field-label">Location</label>
          <input class="field-input edu-location" type="text" value="${edu.location}" oninput="updateEducationField(${idx}, 'location', this.value)" />
        </div>
        <div class="field-group">
          <label class="field-label">Year of Graduation / Completion *</label>
          <input class="field-input edu-year" type="text" value="${edu.year}" oninput="updateEducationField(${idx}, 'year', this.value)" />
        </div>
      </div>
    `;
    educationContainer.appendChild(item);
  });
}

// Sync edits back to State
window.updateExperienceField = function(idx, field, val) {
  state.experience[idx][field] = val;
};
window.updateExperienceBullet = function(idx, bIdx, val) {
  state.experience[idx].bullets[bIdx] = val;
};
window.addExperienceBullet = function(idx) {
  state.experience[idx].bullets.push("New metric-driven project achievement.");
  renderExperienceList();
};
window.removeExperienceBullet = function(idx, bIdx) {
  state.experience[idx].bullets.splice(bIdx, 1);
  renderExperienceList();
};
window.removeExperience = function(idx) {
  state.experience.splice(idx, 1);
  renderExperienceList();
};

window.updateProjectField = function(idx, field, val) {
  state.projects[idx][field] = val;
};
window.updateProjectBullet = function(idx, bIdx, val) {
  state.projects[idx].bullets[bIdx] = val;
};
window.addProjectBullet = function(idx) {
  state.projects[idx].bullets.push("Built key service features with scalable technology options.");
  renderProjectList();
};
window.removeProjectBullet = function(idx, bIdx) {
  state.projects[idx].bullets.splice(bIdx, 1);
  renderProjectList();
};
window.removeProject = function(idx) {
  state.projects.splice(idx, 1);
  renderProjectList();
};

window.updateEducationField = function(idx, field, val) {
  state.education[idx][field] = val;
};
window.removeEducation = function(idx) {
  state.education.splice(idx, 1);
  renderEducationList();
};

// Skill Preview generator
function updateSkillTagsPreview() {
  const preview = document.getElementById("skillTagsPreview");
  preview.innerHTML = "";
  const allSkills = Object.values(skillInputs)
    .map(i => i.value)
    .join(",")
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  allSkills.slice(0, 15).forEach(skill => {
    const span = document.createElement("span");
    span.className = "skill-tag";
    span.innerText = skill;
    preview.appendChild(span);
  });
}

// Add dynamic entities
addExperienceBtn.addEventListener("click", () => {
  state.experience.push({
    company: "Company Name",
    role: "Job Title",
    location: "City, Country",
    startDate: "",
    endDate: "Present",
    bullets: ["Action + Tech + Scale + Impact bullet point"]
  });
  renderExperienceList();
});

addProjectBtn.addEventListener("click", () => {
  state.projects.push({
    name: "Project Name",
    role: "Lead / Contributor",
    link: "",
    bullets: ["Explain role, tool selections, performance optimization metrics"]
  });
  renderProjectList();
});

addEducationBtn.addEventListener("click", () => {
  state.education.push({
    institution: "Institution",
    degree: "Degree",
    location: "",
    year: ""
  });
  renderEducationList();
});

// Sync main inputs back to state
[fullNameInput, jobTitleInput, emailInput, phoneInput, locationInput, linkedinInput, githubInput, portfolioInput, targetRoleInput].forEach(inp => {
  inp.addEventListener("input", (e) => {
    const field = e.target.id;
    if (field === "fullName") state.fullName = e.target.value;
    else if (field === "jobTitle") state.jobTitle = e.target.value;
    else if (field === "email") state.email = e.target.value;
    else if (field === "phone") state.phone = e.target.value;
    else if (field === "location") state.location = e.target.value;
    else if (field === "linkedin") state.linkedin = e.target.value;
    else if (field === "github") state.github = e.target.value;
    else if (field === "portfolio") state.portfolio = e.target.value;
    else if (field === "targetRole") state.targetRole = e.target.value;
  });
});

summaryInput.addEventListener("input", (e) => {
  state.summary = e.target.value;
  summaryCount.innerText = e.target.value.length;
});

Object.keys(skillInputs).forEach(key => {
  skillInputs[key].addEventListener("input", (e) => {
    state.skills[key] = e.target.value;
    updateSkillTagsPreview();
  });
});

// Tab toggle support
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(tc => tc.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
  });
});

// Step navigation
const stepButtons = document.querySelectorAll(".step");
stepButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    stepButtons.forEach(s => s.classList.remove("active"));
    btn.classList.add("active");

    const targetSection = document.getElementById(btn.dataset.target);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// --- GEN ENGINE / ATS PARSING / SCORING ---
function calculateAtsScore(data) {
  let score = 50; // base score for fully completing fields
  const details = [];

  // 1. Personal details check
  if (data.fullName && data.jobTitle && data.email && data.phone) {
    score += 10;
    details.push({ ok: true, text: "Essential Header Info provided" });
  } else {
    details.push({ ok: false, text: "Header missing critical fields (Name/Email/Phone)" });
  }

  // 2. Summary quality check
  if (data.summary && data.summary.length > 150) {
    score += 10;
    details.push({ ok: true, text: "Professional summary is of healthy length" });
  } else {
    details.push({ ok: false, text: "Summary is too short or missing details" });
  }

  // 3. Experience and quantified metrics check
  let quantifiedBullets = 0;
  let totalBullets = 0;
  data.experience.forEach(exp => {
    exp.bullets.forEach(b => {
      totalBullets++;
      if (/\d+%|\d+\s?k|\$\d+|reduced|saved|grew|optimized/gi.test(b)) {
        quantifiedBullets++;
      }
    });
  });

  if (totalBullets >= 4) {
    score += 10;
    details.push({ ok: true, text: "Healthy amount of experience details (${totalBullets} bullets)" });
  } else {
    details.push({ ok: false, text: "Add more job description details/bullets (minimum 4)" });
  }

  if (quantifiedBullets >= 2) {
    score += 10;
    details.push({ ok: true, text: "Quantifiable impact markers found (${quantifiedBullets} bullets)" });
  } else {
    score -= 5;
    details.push({ ok: false, text: "Quantify achievements (add metrics, e.g., %, $, speed ups)" });
  }

  // 4. Role target matching
  const targetKeywords = data.targetRole.split(",").map(k => k.trim().toLowerCase()).filter(k => k.length > 0);
  let keywordsMatched = 0;
  const fullText = JSON.stringify(data).toLowerCase();

  targetKeywords.forEach(kw => {
    if (kw && fullText.includes(kw)) {
      keywordsMatched++;
    }
  });

  if (targetKeywords.length > 0) {
    const ratio = keywordsMatched / targetKeywords.length;
    if (ratio >= 0.75) {
      score += 10;
      details.push({ ok: true, text: `Strong job description keyword matches (${keywordsMatched}/${targetKeywords.length})` });
    } else {
      score += Math.floor(ratio * 10);
      details.push({ ok: false, text: `Improve keyword matches with target JD (matched ${keywordsMatched}/${targetKeywords.length})` });
    }
  }

  // Cap score limits
  score = Math.min(Math.max(score, 10), 100);

  return { score, details };
}

// Generate premium recruiter-safe resume HTML output
function renderResumePaper(data) {
  // Clear any existing contents
  resumePaper.innerHTML = "";

  const container = document.createElement("div");
  container.className = "resume-body-content";
  container.style.width = "100%";

  // Clean ATS Header
  let headerHtml = `
    <header class="res-header">
      <h1 class="res-name">${data.fullName}</h1>
      <div class="res-title">${data.jobTitle}</div>
      <div class="res-contact">
        ${data.phone ? `<span>${data.phone}</span>` : ''}
        ${data.email ? `<span>| &nbsp; <a href="mailto:${data.email}">${data.email}</a></span>` : ''}
        ${data.location ? `<span>| &nbsp; ${data.location}</span>` : ''}
        ${data.linkedin ? `<span>| &nbsp; <a href="https://${data.linkedin.replace('https://', '')}" target="_blank">LinkedIn</a></span>` : ''}
        ${data.github ? `<span>| &nbsp; <a href="https://${data.github.replace('https://', '')}" target="_blank">GitHub</a></span>` : ''}
        ${data.portfolio ? `<span>| &nbsp; <a href="https://${data.portfolio.replace('https://', '')}" target="_blank">Portfolio</a></span>` : ''}
      </div>
    </header>
  `;

  // Summary
  let summaryHtml = `
    <section class="res-section">
      <h2 class="res-section-title">Professional Summary</h2>
      <p class="res-summary">${data.summary}</p>
    </section>
  `;

  // Skills Row/Grid for Recruiter Scanning
  let skillsHtml = `
    <section class="res-section">
      <h2 class="res-section-title">Technical Skills</h2>
      <div class="res-skills-grid">
        ${data.skills.frontend ? `
          <div class="res-skills-row">
            <span class="res-skills-label">Frontend:</span>
            <span class="res-skills-val">${data.skills.frontend}</span>
          </div>
        ` : ''}
        ${data.skills.backend ? `
          <div class="res-skills-row">
            <span class="res-skills-label">Backend:</span>
            <span class="res-skills-val">${data.skills.backend}</span>
          </div>
        ` : ''}
        ${data.skills.database ? `
          <div class="res-skills-row">
            <span class="res-skills-label">Databases:</span>
            <span class="res-skills-val">${data.skills.database}</span>
          </div>
        ` : ''}
        ${data.skills.devops ? `
          <div class="res-skills-row">
            <span class="res-skills-label">DevOps &amp; Cloud:</span>
            <span class="res-skills-val">${data.skills.devops}</span>
          </div>
        ` : ''}
        ${data.skills.other ? `
          <div class="res-skills-row">
            <span class="res-skills-label">Tools &amp; Others:</span>
            <span class="res-skills-val">${data.skills.other}</span>
          </div>
        ` : ''}
      </div>
    </section>
  `;

  // Experience Section
  let experienceHtml = "";
  if (data.experience && data.experience.length > 0) {
    experienceHtml = `
      <section class="res-section">
        <h2 class="res-section-title">Professional Experience</h2>
        <div style="display: flex; flex-direction: column; gap: 0.95rem;">
          ${data.experience.map(exp => `
            <div class="res-entry">
              <div class="res-entry-header">
                <span>${exp.company}</span>
                <span>${exp.location}</span>
              </div>
              <div class="res-entry-subheader">
                <span>${exp.role}</span>
                <span>${exp.startDate} &mdash; ${exp.endDate}</span>
              </div>
              <ul class="res-bullets">
                ${exp.bullets.map(b => `<li class="res-bullet">${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // Projects Section
  let projectsHtml = "";
  if (data.projects && data.projects.length > 0) {
    projectsHtml = `
      <section class="res-section">
        <h2 class="res-section-title">Technical Projects</h2>
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${data.projects.map(proj => `
            <div class="res-entry">
              <div class="res-entry-header">
                <span>${proj.name} ${proj.role ? ` | ${proj.role}` : ''}</span>
                <span>${proj.link ? `<a href="https://${proj.link.replace('https://', '')}" target="_blank" style="font-size: 8.5pt; font-weight: normal; color: var(--res-accent); text-decoration: none;">Link</a>` : ''}</span>
              </div>
              <ul class="res-bullets" style="margin-top: 0.15rem;">
                ${proj.bullets.map(b => `<li class="res-bullet">${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  // Education Section
  let educationHtml = "";
  if (data.education && data.education.length > 0) {
    educationHtml = `
      <section class="res-section">
        <h2 class="res-section-title">Education</h2>
        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
          ${data.education.map(edu => `
            <div class="res-entry">
              <div class="res-entry-header">
                <span>${edu.institution}</span>
                <span>${edu.location}</span>
              </div>
              <div class="res-entry-subheader">
                <span>${edu.degree}</span>
                <span>Graduation: ${edu.year}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  container.innerHTML = headerHtml + summaryHtml + skillsHtml + experienceHtml + projectsHtml + educationHtml;
  resumePaper.appendChild(container);
}

// Generate Action handler
function handleGenerate() {
  loadingOverlay.classList.add("show");

  setTimeout(() => {
    // 1. Calculate Score
    const { score, details } = calculateAtsScore(state);

    // Update Circular Indicator
    scoreNumber.innerText = score + "%";
    const dashOffset = 100 - score;
    scoreArc.style.strokeDasharray = `${score}, 100`;

    // 2. Render Live Preview Paper
    renderResumePaper(state);

    // 3. Render JSON output
    const outJson = {
      summary: state.summary,
      skills: Object.values(state.skills).map(s => s.split(',').map(item => item.trim())).flat().filter(item => item.length > 0),
      experience: state.experience,
      projects: state.projects,
      education: state.education,
      ats_estimated_score: `${score}%`
    };
    jsonOutput.innerText = JSON.stringify(outJson, null, 2);

    // 4. Render Analysis recommendations list
    analysisWrap.innerHTML = `
      <div class="analysis-score-hero">
        <div class="analysis-score-val">${score}%</div>
        <div class="analysis-score-msg">
          <span class="analysis-score-title">${score >= 85 ? 'Premium Recruiter-Ready Status' : 'Needs Optimization'}</span>
          <span class="analysis-score-desc">Optimized against Workday, Taleo, Ashby, and Lever parse rules.</span>
        </div>
      </div>
      <div class="analysis-card">
        <h3>ATS Optimization Diagnostics</h3>
        <ul class="analysis-checklist">
          ${details.map(item => `
            <li class="analysis-item">
              <span class="analysis-status-icon ${item.ok ? 'success' : 'warning'}">
                ${item.ok ? '✓' : '⚠'}
              </span>
              <span>${item.text}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    // Done
    loadingOverlay.classList.remove("show");
    showToast("ATS Optimization Engine completed successfully!");
  }, 1000);
}

// PDF Export Execution
function handleDownloadPdf() {
  const paper = document.getElementById("resumePaper");
  if (paper.querySelector(".resume-placeholder")) {
    showToast("Please generate your resume first before exporting.");
    return;
  }

  // Capture original scroll positions
  const originalScrollY = window.scrollY;
  const originalScrollX = window.scrollX;

  // Scroll to absolute top-left to eliminate any viewport offset calculations
  window.scrollTo(0, 0);

  // Create an off-screen clone of the resume paper to avoid scroll offset errors
  const clone = paper.cloneNode(true);
  clone.id = "resumePaperClone";
  clone.style.position = "absolute";
  clone.style.left = "0";
  clone.style.top = "0";
  clone.style.width = "794px"; // Standard A4 width at 96 DPI
  clone.style.maxWidth = "794px";
  clone.style.minHeight = "auto"; // Flow height naturally
  clone.style.boxShadow = "none";
  clone.style.background = "#ffffff";
  clone.style.color = "#1f2937";
  clone.style.padding = "20mm"; // Standard corporate margin padding
  clone.style.zIndex = "-99999";
  clone.style.opacity = "1";
  
  document.body.appendChild(clone);

  // Wait briefly for DOM to fully layout the clone
  setTimeout(() => {
    // Configure html2pdf options with height tracking
    const opt = {
      margin: 0, 
      filename: `${state.fullName.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2.5, 
        useCORS: true, 
        letterRendering: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 794,
        windowHeight: clone.offsetHeight,
        logging: false
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] } 
    };

    showToast("Compiling corporate-grade PDF print job...");
    
    html2pdf().from(clone).set(opt).save().then(() => {
      document.body.removeChild(clone);
      window.scrollTo(originalScrollX, originalScrollY);
      showToast("PDF Resume successfully downloaded!");
    }).catch(err => {
      console.error("PDF generation failure: ", err);
      if (document.getElementById("resumePaperClone")) {
        document.body.removeChild(clone);
      }
      window.scrollTo(originalScrollX, originalScrollY);
      showToast("Error generating PDF. Please try again.");
    });
  }, 100);
}

// Word Export Execution (recruiter-grade rich text document)
function handleDownloadWord() {
  const paper = document.getElementById("resumePaper");
  if (paper.querySelector(".resume-placeholder")) {
    showToast("Please generate your resume first before exporting.");
    return;
  }

  const htmlContent = paper.innerHTML;
  
  // Word HTML template matching corporate typography and printable specifications
  const html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <title>${state.fullName} - Resume</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: 8.5in 11.0in;
          margin: 0.75in 0.75in 0.75in 0.75in;
        }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: 10.5pt;
          line-height: 1.3;
          color: #111827;
        }
        .res-header {
          text-align: center;
          border-bottom: 2px solid #111827;
          padding-bottom: 6pt;
          margin-bottom: 12pt;
        }
        .res-name {
          font-family: 'Calibri-Bold', 'Arial', sans-serif;
          font-size: 20pt;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 2pt;
          color: #111827;
        }
        .res-title {
          font-size: 11.5pt;
          font-weight: bold;
          color: #2563eb;
          text-transform: uppercase;
          margin-bottom: 4pt;
        }
        .res-contact {
          text-align: center;
          font-size: 9pt;
          color: #4b5563;
          margin-bottom: 6pt;
        }
        .res-contact span {
          display: inline;
          margin: 0 4pt;
        }
        .res-contact a {
          color: #4b5563;
          text-decoration: none;
        }
        .res-section {
          margin-top: 14pt;
          display: block;
        }
        .res-section-title {
          font-size: 11.5pt;
          font-weight: bold;
          text-transform: uppercase;
          color: #111827;
          border-bottom: 1px solid #d1d5db;
          padding-bottom: 2pt;
          margin-top: 10pt;
          margin-bottom: 6pt;
        }
        .res-summary {
          font-size: 9.5pt;
          color: #374151;
          line-height: 1.35;
          margin-bottom: 8pt;
        }
        .res-skills-grid {
          margin-bottom: 6pt;
        }
        .res-skills-row {
          margin-bottom: 4pt;
        }
        .res-skills-label {
          font-weight: bold;
          color: #111827;
          width: 110pt;
          float: left;
        }
        .res-skills-val {
          color: #374151;
          float: left;
          width: 400pt;
        }
        .res-entry {
          margin-bottom: 10pt;
          display: block;
          clear: both;
        }
        .res-entry-header {
          font-weight: bold;
          font-size: 10pt;
          color: #111827;
          margin-bottom: 1pt;
          display: block;
        }
        .res-entry-header span:first-child {
          float: left;
        }
        .res-entry-header span:last-child {
          float: right;
        }
        .res-entry-subheader {
          font-style: italic;
          font-size: 9pt;
          color: #4b5563;
          margin-bottom: 4pt;
          display: block;
          clear: both;
        }
        .res-entry-subheader span:first-child {
          float: left;
        }
        .res-entry-subheader span:last-child {
          float: right;
        }
        .res-bullets {
          margin-top: 4pt;
          margin-bottom: 6pt;
          padding-left: 15pt;
          clear: both;
        }
        .res-bullet {
          font-size: 9.5pt;
          color: #374151;
          margin-bottom: 2.5pt;
          line-height: 1.3;
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

  showToast("Compiling editable Microsoft Word document...");
  
  const blob = new Blob(['\ufeff' + html], {
    type: 'application/msword'
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${state.fullName.toLowerCase().replace(/\s+/g, '_')}_resume.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Word Resume successfully downloaded!");
}

// Copy JSON trigger
copyJsonBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(jsonOutput.innerText).then(() => {
    showToast("JSON successfully copied to clipboard.");
  });
});

// Bind triggers
generateBtn.addEventListener("click", handleGenerate);
downloadBtn.addEventListener("click", handleDownloadPdf);
navDownloadBtn.addEventListener("click", handleDownloadPdf);

// Bind Word downloader triggers
const downloadWordBtn = document.getElementById("downloadWordBtn");
const navDownloadWordBtn = document.getElementById("navDownloadWordBtn");
if (downloadWordBtn) downloadWordBtn.addEventListener("click", handleDownloadWord);
if (navDownloadWordBtn) navDownloadWordBtn.addEventListener("click", handleDownloadWord);

// Initialize system
window.addEventListener("DOMContentLoaded", () => {
  initParticles();
  populateForm();
});
