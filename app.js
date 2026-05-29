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
    frontend: "React.js, Next.js, JavaScript, HTML/CSS, Tailwind CSS, shadcn/ui, Angular",
    backend: "Node.js, Express.js, REST APIs, FastAPI, WebSockets, JWT, RBAC",
    database: "PostgreSQL, MongoDB, SQL, Sequelize ORM, Query Optimization, Indexing",
    devops: "DigitalOcean, Docker, PM2, Nginx, Cloudflare, CI/CD",
    other: "Razorpay, Stripe, PayPal, Webhook Validation, HMAC Verification, OAuth, Git, Postman, System Design"
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
      skills: ["Docker", "PM2", "Nginx", "Cloudflare", "CI/CD", "DigitalOcean"],
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
      skills: ["WordPress", "Cheerio", "Node.js"],
      bullets: [
        "Built production-grade sitemap management engine supporting XML import, sync, rebuild, and dynamic sitemap_index.xml generation.",
        "Implemented Cheerio-based DOM parsing with intelligent image extraction; built admin dashboard for full URL lifecycle management."
      ]
    },
    {
      name: "B2B Lead Intelligence & Data Delivery Platform",
      role: "Full Stack Developer",
      link: "github.com/Yashhirudkar",
      skills: ["PostgreSQL", "React.js", "Node.js", "Express.js"],
      bullets: [
        "Developed scalable lead marketplace with advanced List Builder, credit system, real-time Socket.IO dashboard updates, and optimized PostgreSQL queries for high-volume datasets."
      ]
    },
    {
      name: "Secure Enterprise API Integration Platform",
      role: "Backend Developer",
      link: "github.com/Yashhirudkar",
      skills: ["JWT", "RBAC", "REST APIs"],
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
            <div class="bullet-row" style="position: relative;">
              <input class="field-input bullet-input" type="text" value="${b.replace(/"/g, '&quot;')}" oninput="updateExperienceBullet(${idx}, ${bIdx}, this.value)" style="padding-right: 4.5rem;" />
              <button class="btn-bullet-optimize" type="button" onclick="optimizeExperienceBullet(${idx}, ${bIdx})" title="AI Optimize Bullet" style="position: absolute; right: 2.2rem; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3); color: #c084fc; font-size: 0.8rem; cursor: pointer; padding: 0.2rem 0.4rem; border-radius: 4px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; height: 24px; z-index: 10;">✨</button>
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
        <div class="project-skills-container">
          <div class="project-skills-header" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <span class="field-label">Project Skills (Auto-inferred / Manual)</span>
            <button class="btn-bullet-optimize" id="proj-skills-ai-${idx}" type="button" onclick="inferProjectSkillsAI(${idx})" style="padding: 2px 6px; font-size: 0.75rem; border-radius: 4px; margin-bottom: 4px; display: inline-flex; align-items: center; gap: 4px; background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3); color: #c084fc; cursor: pointer; height: 24px; transition: all 0.2s;">✨ AI Infer</button>
          </div>
          <div class="project-skills-list" id="project-skills-${idx}">
            ${(proj.skills || []).map((s, sIdx) => `
              <span class="project-skill-tag">
                ${s}
                <span class="project-skill-remove" onclick="removeProjectSkill(${idx}, ${sIdx})">×</span>
              </span>
            `).join('')}
          </div>
          <div class="autocomplete-container" style="margin-top: 0.5rem;">
            <input class="field-input proj-skills-input" data-proj-idx="${idx}" type="text" placeholder="Add skill (e.g. Docker)..." onkeydown="handleProjSkillsKeydown(event, ${idx})" />
          </div>
        </div>
      </div>
      <div class="bullet-list-container">
        <label class="field-label">Impact Description *</label>
        <div class="bullet-rows-container" id="proj-bullets-${idx}">
          ${proj.bullets.map((b, bIdx) => `
            <div class="bullet-row" style="position: relative;">
              <input class="field-input bullet-input" type="text" value="${b.replace(/"/g, '&quot;')}" oninput="updateProjectBullet(${idx}, ${bIdx}, this.value)" style="padding-right: 4.5rem;" />
              <button class="btn-bullet-optimize" type="button" onclick="optimizeProjectBullet(${idx}, ${bIdx})" title="AI Optimize Bullet" style="position: absolute; right: 2.2rem; top: 50%; transform: translateY(-50%); background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3); color: #c084fc; font-size: 0.8rem; cursor: pointer; padding: 0.2rem 0.4rem; border-radius: 4px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; height: 24px; z-index: 10;">✨</button>
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
  if (field === 'name') {
    inferProjectSkills(idx);
  }
};
window.updateProjectBullet = function(idx, bIdx, val) {
  state.projects[idx].bullets[bIdx] = val;
  inferProjectSkills(idx);
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
    skills: [],
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
// Helper to apply sizing rules dynamically during scaling optimization
function applySinglePageStyles(page, inner, paddingY, sectionGap, entryGap, bulletGap, fontSize, lineHeight) {
  page.style.padding = `${paddingY}rem ${paddingY * 0.75}rem`;
  page.style.fontSize = `${fontSize}pt`;
  page.style.lineHeight = `${lineHeight}`;
  
  const sections = inner.querySelectorAll(".res-section");
  sections.forEach(sec => {
    sec.style.marginTop = `${sectionGap}rem`;
  });
  
  const titles = inner.querySelectorAll(".res-section-title");
  titles.forEach(title => {
    title.style.marginTop = `${sectionGap * 0.8}rem`;
    title.style.marginBottom = `${sectionGap * 0.5}rem`;
    title.style.fontSize = `${fontSize + 1.5}pt`;
  });
  
  const entries = inner.querySelectorAll(".res-entry");
  entries.forEach(entry => {
    entry.style.marginBottom = `${entryGap}rem`;
  });
  
  const bulletsList = inner.querySelectorAll(".res-bullets");
  bulletsList.forEach(bl => {
    bl.style.marginTop = `${bulletGap * 0.5}rem`;
    bl.style.marginBottom = `${bulletGap * 0.8}rem`;
  });
  
  const bullets = inner.querySelectorAll(".res-bullet");
  bullets.forEach(b => {
    b.style.fontSize = `${fontSize - 1.2}pt`;
    b.style.marginBottom = `${bulletGap}rem`;
  });
}

// Layout Self-Adjustment Optimization (Steps 1-4)
function optimizeSinglePageLayout(page, inner) {
  // Spacing targets:
  let paddingY = 3.0; // rem
  let sectionGap = 1.0; // rem
  let entryGap = 0.8; // rem
  let bulletGap = 0.25; // rem
  let fontSize = 9.5; // pt
  let lineHeight = 1.45;
  
  // First, apply default style state
  applySinglePageStyles(page, inner, paddingY, sectionGap, entryGap, bulletGap, fontSize, lineHeight);
  
  const pageHeight = 1120;
  let iterations = 0;
  const maxIterations = 35;
  
  // Step-by-step reduction loop if overflow detected
  while (page.scrollHeight > pageHeight && iterations < maxIterations) {
    iterations++;
    
    // Step 1: Reduce paddings, gaps, and margins
    if (paddingY > 1.2) {
      paddingY -= 0.15;
    }
    if (sectionGap > 0.4) {
      sectionGap -= 0.08;
    }
    if (entryGap > 0.3) {
      entryGap -= 0.08;
    }
    if (bulletGap > 0.05) {
      bulletGap -= 0.02;
    }
    
    // Step 2: Reduce font size and line height slightly
    if (iterations > 10) {
      if (fontSize > 7.6) {
        fontSize -= 0.15;
      }
      if (lineHeight > 1.15) {
        lineHeight -= 0.03;
      }
    }
    
    // Step 3: Compress Skills layout (2-column layout to save vertical space)
    if (iterations > 18) {
      const skillsGrid = inner.querySelector(".res-skills-grid");
      if (skillsGrid) {
        skillsGrid.style.display = "grid";
        skillsGrid.style.gridTemplateColumns = "1fr 1fr";
        skillsGrid.style.gap = "0.2rem";
        const rows = skillsGrid.querySelectorAll(".res-skills-row");
        rows.forEach(row => {
          row.style.marginBottom = "0";
          const label = row.querySelector(".res-skills-label");
          const val = row.querySelector(".res-skills-val");
          if (label) { label.style.width = "auto"; label.style.float = "none"; label.style.display = "block"; }
          if (val) { val.style.width = "auto"; val.style.float = "none"; val.style.display = "block"; }
        });
      }
    }
    
    applySinglePageStyles(page, inner, paddingY, sectionGap, entryGap, bulletGap, fontSize, lineHeight);
  }
  
  // Step 4: Page Fill Optimization - expand if there is extra unused space
  if (page.scrollHeight < pageHeight - 40 && iterations === 0) {
    let fillPaddingY = paddingY;
    let fillSectionGap = sectionGap;
    let fillEntryGap = entryGap;
    let fillBulletGap = bulletGap;
    
    while (page.scrollHeight < pageHeight - 15 && fillPaddingY < 3.4) {
      fillPaddingY += 0.1;
      fillSectionGap += 0.04;
      fillEntryGap += 0.04;
      fillBulletGap += 0.015;
      applySinglePageStyles(page, inner, fillPaddingY, fillSectionGap, fillEntryGap, fillBulletGap, fontSize, lineHeight);
      
      // If we overshoot, revert last step and break
      if (page.scrollHeight > pageHeight) {
        applySinglePageStyles(page, inner, fillPaddingY - 0.1, fillSectionGap - 0.04, fillEntryGap - 0.04, fillBulletGap - 0.015, fontSize, lineHeight);
        break;
      }
    }
  }
}

// Generate premium recruiter-safe resume HTML output
function renderResumePaper(data) {
  // Clear any existing contents
  resumePaper.innerHTML = "";

  // Apply layout template class
  const templateSelect = document.getElementById("templateSelect");
  const activeTpl = templateSelect ? templateSelect.value : "modern";
  
  const isSingle = document.getElementById("modeSingleBtn")?.classList.contains("active") || false;
  const selectedMode = isSingle ? "single" : "multi";

  // Helper to create a new page container
  let pageCount = 0;
  function createNewPage() {
    pageCount++;
    const page = document.createElement("div");
    page.className = `resume-page tpl-${activeTpl} mode-${selectedMode}`;
    page.dataset.pageNumber = pageCount;
    
    const inner = document.createElement("div");
    inner.className = "resume-body-content";
    inner.style.width = "100%";
    inner.style.display = "flex";
    inner.style.flexDirection = "column";
    
    page.appendChild(inner);
    resumePaper.appendChild(page);
    return { page, inner };
  }

  // Handle placeholders
  if (!data.fullName) {
    const { page, inner } = createNewPage();
    inner.innerHTML = `
      <div class="resume-placeholder">
        <div class="placeholder-icon">⬡</div>
        <p>Fill in your details and click<br/><strong>Generate ATS Resume</strong></p>
        <p class="placeholder-sub">Your ATS-optimized resume will appear here</p>
      </div>
    `;
    return;
  }

  // Create primary HTML parts as raw strings so we can construct DOM nodes out of them
  const headerHtml = `
    <header class="res-header">
      <h1 class="res-name">${data.fullName}</h1>
      <div class="res-title">${data.jobTitle || ''}</div>
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

  const summaryHtml = data.summary ? `
    <section class="res-section">
      <h2 class="res-section-title">Professional Summary</h2>
      <p class="res-summary">${data.summary}</p>
    </section>
  ` : '';

  const skillsHtml = `
    <section class="res-section">
      <h2 class="res-section-title">Technical Skills</h2>
      <div class="res-skills-grid">
        ${data.skills?.frontend ? `
          <div class="res-skills-row">
            <span class="res-skills-label">Frontend:</span>
            <span class="res-skills-val">${data.skills.frontend}</span>
          </div>
        ` : ''}
        ${data.skills?.backend ? `
          <div class="res-skills-row">
            <span class="res-skills-label">Backend:</span>
            <span class="res-skills-val">${data.skills.backend}</span>
          </div>
        ` : ''}
        ${data.skills?.database ? `
          <div class="res-skills-row">
            <span class="res-skills-label">Databases:</span>
            <span class="res-skills-val">${data.skills.database}</span>
          </div>
        ` : ''}
        ${data.skills?.devops ? `
          <div class="res-skills-row">
            <span class="res-skills-label">DevOps &amp; Cloud:</span>
            <span class="res-skills-val">${data.skills.devops}</span>
          </div>
        ` : ''}
        ${data.skills?.other ? `
          <div class="res-skills-row">
            <span class="res-skills-label">Tools &amp; Others:</span>
            <span class="res-skills-val">${data.skills.other}</span>
          </div>
        ` : ''}
      </div>
    </section>
  `;

  // Helper to convert an HTML string to a DOM node
  function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  if (selectedMode === 'single') {
    // ----------------------------------------------------------------
    // SINGLE PAGE MODE IMPLEMENTATION
    // ----------------------------------------------------------------
    const { page, inner } = createNewPage();
    
    // Append all user content into this page (preserving all content)
    if (headerHtml) inner.appendChild(htmlToElement(headerHtml));
    if (summaryHtml) inner.appendChild(htmlToElement(summaryHtml));
    if (skillsHtml) inner.appendChild(htmlToElement(skillsHtml));
    
    // Experience Section
    if (data.experience && data.experience.length > 0) {
      const expSection = htmlToElement(`
        <section class="res-section">
          <h2 class="res-section-title">Professional Experience</h2>
          <div class="exp-container" style="display: flex; flex-direction: column; gap: 0.95rem;"></div>
        </section>
      `);
      const expContainer = expSection.querySelector(".exp-container");
      data.experience.forEach(exp => {
        const expEntry = htmlToElement(`
          <div class="res-entry">
            <div class="res-entry-header">
              <span class="res-entry-left">${exp.company}</span>
              <span class="res-entry-right">${exp.location}</span>
            </div>
            <div class="res-entry-subheader">
              <span class="res-entry-left">${exp.role}</span>
              <span class="res-entry-right">${exp.startDate} &mdash; ${exp.endDate}</span>
            </div>
            <ul class="res-bullets">
              ${exp.bullets.map(b => `<li class="res-bullet">${b}</li>`).join('')}
            </ul>
          </div>
        `);
        expContainer.appendChild(expEntry);
      });
      inner.appendChild(expSection);
    }
    
    // Projects Section
    if (data.projects && data.projects.length > 0) {
      const projSection = htmlToElement(`
        <section class="res-section" id="res-section-projects">
          <h2 class="res-section-title">Technical Projects</h2>
          <div class="proj-container" style="display: flex; flex-direction: column; gap: 0.85rem;"></div>
        </section>
      `);
      const projContainer = projSection.querySelector(".proj-container");
      data.projects.forEach(proj => {
        const projEntry = htmlToElement(`
          <div class="res-entry">
            <div class="res-entry-header">
              <span class="res-entry-left">${proj.name}${proj.role ? ` | ${proj.role}` : ''}</span>
              ${proj.link ? `<span class="res-entry-right"><a href="https://${proj.link.replace('https://', '')}" target="_blank" style="font-size: 8.5pt; font-weight: normal; color: var(--res-accent); text-decoration: none;">Link</a></span>` : ''}
            </div>
            ${proj.skills && proj.skills.length > 0 ? `
              <div style="font-size: 8.5pt; color: var(--res-text-light); margin-top: 1px; margin-bottom: 2px;">
                <strong>Technologies:</strong> ${proj.skills.join(', ')}
              </div>
            ` : ''}
            <ul class="res-bullets" style="margin-top: 0.15rem;">
              ${proj.bullets.map(b => `<li class="res-bullet">${b}</li>`).join('')}
            </ul>
          </div>
        `);
        projContainer.appendChild(projEntry);
      });
      inner.appendChild(projSection);
    }
    
    // Education Section
    if (data.education && data.education.length > 0) {
      const eduSection = htmlToElement(`
        <section class="res-section">
          <h2 class="res-section-title">Education</h2>
          <div class="edu-container" style="display: flex; flex-direction: column; gap: 0.6rem;"></div>
        </section>
      `);
      const eduContainer = eduSection.querySelector(".edu-container");
      data.education.forEach(edu => {
        const eduEntry = htmlToElement(`
          <div class="res-entry">
            <div class="res-entry-header">
              <span class="res-entry-left">${edu.institution}</span>
              <span class="res-entry-right">${edu.location}</span>
            </div>
            <div class="res-entry-subheader">
              <span class="res-entry-left">${edu.degree}</span>
              <span class="res-entry-right">Graduation: ${edu.year}</span>
            </div>
          </div>
        `);
        eduContainer.appendChild(eduEntry);
      });
      inner.appendChild(eduSection);
    }

    // Run layout self-adjustment optimization (Steps 1-4)
    optimizeSinglePageLayout(page, inner);
    
  } else {
    // ----------------------------------------------------------------
    // MULTI PAGE MODE IMPLEMENTATION (Dynamic Page Breaks)
    // ----------------------------------------------------------------
    let current = createNewPage();
    
    // Append standard top blocks to Page 1
    if (headerHtml) current.inner.appendChild(htmlToElement(headerHtml));
    if (summaryHtml) current.inner.appendChild(htmlToElement(summaryHtml));
    if (skillsHtml) current.inner.appendChild(htmlToElement(skillsHtml));
    
    const pageHeightLimit = 1120;
    
    function canFitOnCurrentPage(el) {
      current.inner.appendChild(el);
      const paddingVal = parseFloat(getComputedStyle(current.page).paddingTop) + parseFloat(getComputedStyle(current.page).paddingBottom) || 96;
      const allowedInnerHeight = pageHeightLimit - paddingVal;
      const overflows = current.inner.scrollHeight > allowedInnerHeight;
      current.inner.removeChild(el);
      return !overflows;
    }

    // Helper to safely append elements, breaking to new page when necessary
    function appendWithPagination(sectionTitle, entries, renderEntryFn) {
      if (!entries || entries.length === 0) return;
      
      // Try to create section on current page
      let sectionEl = htmlToElement(`
        <section class="res-section">
          <h2 class="res-section-title">${sectionTitle}</h2>
          <div class="section-container" style="display: flex; flex-direction: column; gap: 0.85rem;"></div>
        </section>
      `);
      
      let container = sectionEl.querySelector(".section-container");
      let addedAny = false;
      
      entries.forEach(entry => {
        const entryEl = renderEntryFn(entry);
        
        // Append entry to container temporarily to measure
        container.appendChild(entryEl);
        
        if (canFitOnCurrentPage(sectionEl)) {
          // It fits! Just leave it in the container
          addedAny = true;
        } else {
          // Doesn't fit. Remove from container
          container.removeChild(entryEl);
          
          if (addedAny) {
            // Append current section as is to current page
            current.inner.appendChild(sectionEl);
          }
          
          // Start a new page
          current = createNewPage();
          
          // Create new section block for new page
          sectionEl = htmlToElement(`
            <section class="res-section">
              <h2 class="res-section-title">${sectionTitle} (Continued)</h2>
              <div class="section-container" style="display: flex; flex-direction: column; gap: 0.85rem;"></div>
            </section>
          `);
          container = sectionEl.querySelector(".section-container");
          
          // Append to new page section
          container.appendChild(entryEl);
          addedAny = true;
        }
      });
      
      if (addedAny) {
        current.inner.appendChild(sectionEl);
      }
    }

    // Render Experience with pagination
    appendWithPagination("Professional Experience", data.experience, (exp) => {
      return htmlToElement(`
        <div class="res-entry">
          <div class="res-entry-header">
            <span class="res-entry-left">${exp.company}</span>
            <span class="res-entry-right">${exp.location}</span>
          </div>
          <div class="res-entry-subheader">
            <span class="res-entry-left">${exp.role}</span>
            <span class="res-entry-right">${exp.startDate} &mdash; ${exp.endDate}</span>
          </div>
          <ul class="res-bullets">
            ${exp.bullets.map(b => `<li class="res-bullet">${b}</li>`).join('')}
          </ul>
        </div>
      `);
    });

    // Render Projects with pagination
    appendWithPagination("Technical Projects", data.projects, (proj) => {
      return htmlToElement(`
        <div class="res-entry">
          <div class="res-entry-header">
            <span class="res-entry-left">${proj.name}${proj.role ? ` | ${proj.role}` : ''}</span>
            ${proj.link ? `<span class="res-entry-right"><a href="https://${proj.link.replace('https://', '')}" target="_blank" style="font-size: 8.5pt; font-weight: normal; color: var(--res-accent); text-decoration: none;">Link</a></span>` : ''}
          </div>
          ${proj.skills && proj.skills.length > 0 ? `
            <div style="font-size: 8.5pt; color: var(--res-text-light); margin-top: 1px; margin-bottom: 2px;">
              <strong>Technologies:</strong> ${proj.skills.join(', ')}
            </div>
          ` : ''}
          <ul class="res-bullets" style="margin-top: 0.15rem;">
            ${proj.bullets.map(b => `<li class="res-bullet">${b}</li>`).join('')}
          </ul>
        </div>
      `);
    });

    // Render Education with pagination
    appendWithPagination("Education", data.education, (edu) => {
      return htmlToElement(`
        <div class="res-entry">
          <div class="res-entry-header">
            <span class="res-entry-left">${edu.institution}</span>
            <span class="res-entry-right">${edu.location}</span>
          </div>
          <div class="res-entry-subheader">
            <span class="res-entry-left">${edu.degree}</span>
            <span class="res-entry-right">Graduation: ${edu.year}</span>
          </div>
        </div>
      `);
    });
  }
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

  // Capture original scroll positions and element styles
  const originalScrollY = window.scrollY;
  const originalScrollX = window.scrollX;

  const originalWidth = paper.style.width;
  const originalMaxWidth = paper.style.maxWidth;
  const originalMinHeight = paper.style.minHeight;
  const originalBoxShadow = paper.style.boxShadow;
  const originalPadding = paper.style.padding;

  // Capture individual pages original styles
  const pages = paper.querySelectorAll(".resume-page");
  const originalPagesStyles = [];
  pages.forEach(p => {
    originalPagesStyles.push({
      width: p.style.width,
      maxWidth: p.style.maxWidth,
      minHeight: p.style.minHeight,
      height: p.style.height,
      boxShadow: p.style.boxShadow,
      border: p.style.border,
      margin: p.style.margin,
      padding: p.style.padding
    });
    
    // Set standard PDF sizes matching our CSS targets
    p.style.width = "794px";
    p.style.maxWidth = "794px";
    p.style.minHeight = "1120px";
    const isSingle = p.classList.contains("mode-single");
    p.style.height = isSingle ? "1120px" : "auto";
    p.style.boxShadow = "none";
    p.style.border = "none";
    p.style.margin = "0";
  });

  // Scroll to absolute top-left to eliminate viewport offsets
  window.scrollTo(0, 0);

  // Apply wrapper constraints
  paper.style.width = "794px";
  paper.style.maxWidth = "794px";
  paper.style.minHeight = "auto";
  paper.style.boxShadow = "none";
  paper.style.padding = "0"; // Zero padding so page padding handles layout

  // Configure html2pdf options (direct capture, no clone)
  const opt = {
    margin: 0, 
    filename: `${state.fullName.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2.5, 
      useCORS: true, 
      letterRendering: true,
      logging: false
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] } 
  };

  showToast("Compiling corporate-grade PDF print job...");
  
  // Wait briefly for style changes to render
  setTimeout(() => {
    html2pdf().from(paper).set(opt).save().then(() => {
      // Restore styles and scroll
      paper.style.width = originalWidth;
      paper.style.maxWidth = originalMaxWidth;
      paper.style.minHeight = originalMinHeight;
      paper.style.boxShadow = originalBoxShadow;
      paper.style.padding = originalPadding;

      pages.forEach((p, idx) => {
        const orig = originalPagesStyles[idx];
        if (orig) {
          p.style.width = orig.width;
          p.style.maxWidth = orig.maxWidth;
          p.style.minHeight = orig.minHeight;
          p.style.height = orig.height;
          p.style.boxShadow = orig.boxShadow;
          p.style.border = orig.border;
          p.style.margin = orig.margin;
          p.style.padding = orig.padding;
        }
      });

      window.scrollTo(originalScrollX, originalScrollY);
      showToast("PDF Resume successfully downloaded!");
    }).catch(err => {
      console.error("PDF generation failure: ", err);
      // Restore styles and scroll even on error
      paper.style.width = originalWidth;
      paper.style.maxWidth = originalMaxWidth;
      paper.style.minHeight = originalMinHeight;
      paper.style.boxShadow = originalBoxShadow;
      paper.style.padding = originalPadding;

      pages.forEach((p, idx) => {
        const orig = originalPagesStyles[idx];
        if (orig) {
          p.style.width = orig.width;
          p.style.maxWidth = orig.maxWidth;
          p.style.minHeight = orig.minHeight;
          p.style.height = orig.height;
          p.style.boxShadow = orig.boxShadow;
          p.style.border = orig.border;
          p.style.margin = orig.margin;
          p.style.padding = orig.padding;
        }
      });

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
        #res-section-projects {
          page-break-before: always;
          break-before: always;
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

// ==========================================
// ATS Skill Intelligence Engine Data Block
// ==========================================
const skillIntelligence = {
  skillsByCategory: {
    "Languages": ["Ada", "Assembly", "Bash/Shell", "C", "C#", "C++", "COBOL", "Dart", "Delphi", "Elixir", "Erlang", "F#", "Fortran", "GDScript", "Gleam", "Go", "Groovy", "HTML/CSS", "Java", "JavaScript", "Kotlin", "Lisp", "Lua", "MATLAB", "MicroPython", "Mojo", "OCaml", "PHP", "Perl", "PowerShell", "Prolog", "Python", "R", "Ruby", "Scala", "Swift", "TypeScript", "VBA", "Visual Basic .NET", "Zig"],
    "Frontend": ["Angular", "AngularJS", "Astro", "Blazor", "Next.js", "Nuxt.js", "React.js", "Svelte", "Tailwind CSS", "Vite", "Webpack", "jQuery", "shadcn/ui"],
    "Backend": ["ASP.NET", "ASP.NET Core", "Agno", "AutoGen", "Axum", "CrewAI", "Deno", "Django", "Express.js", "FastAPI", "Fastify", "Flask", "Haystack", "LangChain", "LangGraph", "Laravel", "LlamaIndex", "NestJS", "Node.js", "Phidata", "Phoenix", "Polars", "Pydantic", "REST APIs", "Ruby on Rails", "Semantic Kernel", "Spring Boot", "Symfony", "Ultralytics"],
    "Database": ["Amazon Redshift", "BigQuery", "Cassandra", "ChromaDB", "ClickHouse", "Cloud Firestore", "CockroachDB", "Cosmos DB", "Databricks SQL", "Datomic", "DuckDB", "DynamoDB", "Elasticsearch", "Firebase Realtime Database", "Fireproof", "H2", "IBM DB2", "InfluxDB", "LanceDB", "LangMem", "Letta", "MariaDB", "Mem0", "Microsoft Access", "Microsoft SQL Server", "Milvus", "MongoDB", "MySQL", "Neo4j", "Oracle Database", "Pinecone", "PocketBase", "PostgreSQL", "Qdrant", "Redis", "SQL", "SQLite", "Snowflake", "Supabase", "SwiftData", "Valkey", "Weaviate", "Zep", "pgvector"],
    "DevOps / Cloud": ["AWS", "Amazon Bedrock", "Ansible", "Azure DevOps", "Cloudflare", "Datadog", "DigitalOcean", "Docker", "Firebase", "Google Cloud Platform (GCP)", "Grafana", "Heroku", "IBM Cloud", "Kubernetes", "Microsoft Azure", "Netlify", "New Relic", "Nginx", "PM2", "Podman", "Prometheus", "Railway", "Splunk", "Terraform", "Vercel", "Vertex AI", "Yandex Cloud"],
    "Security": ["Adversarial Robustness Toolbox (ART)", "JWT", "Protect AI", "Snyk", "Vectra AI", "Wiz"],
    "Testing": ["Jest", "Cypress", "Selenium", "JUnit", "PyTest", "Mocha", "Playwright", "Sentry"],
    "AI / ML": ["Amazon Bedrock", "AutoGen", "ChromaDB", "CrewAI", "Google Gemini", "LangChain", "LangGraph", "LlamaIndex", "Milvus", "Ollama", "OpenAI API", "Pinecone", "Qdrant", "RAG", "Semantic Kernel", "Vertex AI", "Weaviate", "mem0"],
    "Mobile": ["Android Studio", "Dart", "Flutter", "Kotlin", "React Native", "Swift", "SwiftData", "Xcode"],
    "Payments": ["PayPal", "Razorpay", "Stripe"],
    "CMS": ["Drupal", "WordPress", "Odoo"],
    "Architecture": ["REST APIs", "Microservices", "System Design", "API Architecture", "MVC", "GraphQL", "WebSockets"],
    "Tools & Others": ["AgentGPT", "Aider", "Airtable", "Amazon Codewhisperer", "Arize", "Asana", "Auto-GPT", "Blackbox AI", "Bolt.new", "Bun", "Cargo", "ChatGPT", "Claude Code", "ClickUp", "Cline", "Cody", "Composer", "Confluence", "Cursor", "Devin AI", "Doxygen", "Eclipse", "Galileo", "Git", "GitHub", "GitHub Copilot", "GitHub MCP Server", "GitLab", "Glean (Enterprise Agents)", "Google Colab", "Gradle", "Helicone", "Homebrew", "Honeycomb", "IBM watsonx.ai", "IntelliJ IDEA", "Jira", "Jupyter Notebook", "LangSmith", "Langfuse", "Linear", "Lovable", "Lucid (includes Lucidchart)", "MSBuild", "Make", "Martian", "Maven", "Metero", "Microsoft Copilot", "Miro", "Monday.com", "Nano", "Neovim", "Notepad++", "Notion", "NuGet", "Obsidian", "OpenHands", "Opik", "Perplexity", "PhpStorm", "Pip", "Poetry", "Postman", "PowerShell", "PyCharm", "Redmine", "Replit", "Rider", "Roo Code", "RustRover", "Sentry", "Smolagents", "Sublime Text", "Swagger", "Tabnine", "Trae", "Trello", "VSCodium", "Vim", "Visual Studio", "Visual Studio Code", "WebStorm", "Windsurf", "Yarn", "YouTrack", "Zapier", "Zed", "npm", "pnpm", "uv", "v0.dev"]
  },
  autocomplete: {
    "h": ["HTML/CSS", "Heroku", "Homebrew", "Honeycomb", "Haystack", "H2", "HMAC Verification", "HTTP", "Hibernate"],
    "po": ["PostgreSQL", "Postman", "PowerShell", "PocketBase", "Podman", "Poetry", "Polars"],
    "dock": ["Docker", "Docker Compose"]
  },
  relatedSkills: {
    "Node.js": ["Express.js", "REST APIs", "JWT", "PostgreSQL", "Docker", "Redis", "PM2"],
    "React.js": ["Next.js", "Redux", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    "Docker": ["Kubernetes", "Linux", "CI/CD", "Nginx", "AWS"],
    "PostgreSQL": ["SQL", "Sequelize ORM", "Redis", "Indexing", "Query Optimization"],
    "Next.js": ["React.js", "TypeScript", "Tailwind CSS", "Vercel", "Node.js"],
    "Express.js": ["Node.js", "REST APIs", "JWT", "MongoDB", "PostgreSQL"],
    "MongoDB": ["Mongoose", "Express.js", "Node.js", "REST APIs"],
    "AWS": ["Docker", "Kubernetes", "Terraform", "CI/CD", "Cloudflare"]
  },
  projectInferenceRules: [
    {
      keywords: ["devops", "infrastructure", "deployment", "server", "linux", "ubuntu"],
      skills: ["Docker", "PM2", "Nginx", "Cloudflare", "CI/CD", "Ubuntu Linux", "DigitalOcean"]
    },
    {
      keywords: ["payment", "gateway", "checkout", "stripe", "razorpay", "paypal", "transaction"],
      skills: ["Stripe", "Razorpay", "JWT", "Webhook Validation", "REST APIs", "OAuth 2.0"]
    },
    {
      keywords: ["seo", "sitemap", "xml", "parse", "dom", "cheerio", "crawler"],
      skills: ["WordPress", "Cheerio", "Node.js", "REST APIs"]
    },
    {
      keywords: ["lead", "marketplace", "dashboard", "b2b", "socket", "real-time"],
      skills: ["Socket.IO", "PostgreSQL", "React.js", "Node.js", "Express.js"]
    },
    {
      keywords: ["security", "auth", "credential", "rbac", "middleware", "token"],
      skills: ["JWT", "RBAC", "REST APIs", "OAuth 2.0"]
    },
    {
      keywords: ["database", "query", "sequel", "orm", "latency", "index"],
      skills: ["PostgreSQL", "Sequelize ORM", "SQL", "Query Optimization", "Indexing"]
    }
  ]
};

// ==========================================
// Autocomplete & Related Skills Engine Logic
// ==========================================
function levenshteinDistance(a, b) {
  const tmp = [];
  let i, j;
  for (i = 0; i <= a.length; i++) tmp[i] = [i];
  for (j = 0; j <= b.length; j++) tmp[0][j] = j;
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

// Prefix matching + fuzzy matching + typo tolerance logic
function queryAutocomplete(inputVal, limit = 10) {
  const query = inputVal.trim().toLowerCase();
  if (!query) return [];
  
  // Check exact/prefix custom rule matches
  if (skillIntelligence.autocomplete[query]) {
    return skillIntelligence.autocomplete[query].map(skill => {
      let category = "Tools & Others";
      for (const [cat, skills] of Object.entries(skillIntelligence.skillsByCategory)) {
        if (skills.includes(skill)) {
          category = cat;
          break;
        }
      }
      return { skill, category, score: 1000 };
    });
  }

  const prefixMatches = [];
  const fuzzyMatches = [];
  
  for (const [category, skills] of Object.entries(skillIntelligence.skillsByCategory)) {
    for (const skill of skills) {
      const skillLower = skill.toLowerCase();
      
      if (skillLower.startsWith(query)) {
        prefixMatches.push({ skill, category, score: 100 - skill.length });
      } else if (skillLower.includes(query)) {
        prefixMatches.push({ skill, category, score: 50 - skill.length });
      } else {
        // Subsequence check
        let qIdx = 0;
        let sIdx = 0;
        while (qIdx < query.length && sIdx < skillLower.length) {
          if (query[qIdx] === skillLower[sIdx]) qIdx++;
          sIdx++;
        }
        if (qIdx === query.length) {
          fuzzyMatches.push({ skill, category, score: 10 - (skill.length - query.length) });
        } else {
          // Levenshtein distance for typos
          const dist = levenshteinDistance(query, skillLower);
          if (dist <= 2 && skillLower.length > 3) {
            fuzzyMatches.push({ skill, category, score: 5 - dist });
          }
        }
      }
    }
  }

  const allMatches = [...prefixMatches, ...fuzzyMatches];
  allMatches.sort((a, b) => b.score - a.score || a.skill.localeCompare(b.skill));
  
  const seen = new Set();
  const results = [];
  for (const match of allMatches) {
    if (!seen.has(match.skill.toLowerCase())) {
      seen.add(match.skill.toLowerCase());
      results.push(match);
      if (results.length >= limit) break;
    }
  }
  return results;
}

// Project Skill Auto-Inference
window.inferProjectSkills = function(idx) {
  const proj = state.projects[idx];
  if (!proj) return;
  const combinedText = ((proj.name || "") + " " + (proj.bullets || []).join(" ")).toLowerCase();
  
  if (!proj.skills) proj.skills = [];
  const originalCount = proj.skills.length;
  
  skillIntelligence.projectInferenceRules.forEach(rule => {
    let matches = false;
    for (const kw of rule.keywords) {
      if (combinedText.includes(kw.toLowerCase())) {
        matches = true;
        break;
      }
    }
    if (matches) {
      rule.skills.forEach(skill => {
        if (!proj.skills.includes(skill)) {
          proj.skills.push(skill);
        }
      });
    }
  });

  if (proj.skills.length !== originalCount) {
    renderProjectSkillsList(idx);
    updateSmartRecommendations();
  }
};

window.removeProjectSkill = function(projIdx, skillIdx) {
  if (state.projects[projIdx] && state.projects[projIdx].skills) {
    state.projects[projIdx].skills.splice(skillIdx, 1);
    renderProjectSkillsList(projIdx);
    updateSmartRecommendations();
  }
};

window.handleProjSkillsKeydown = function(e, idx) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const input = e.target;
    const val = input.value.trim();
    if (val) {
      if (!state.projects[idx].skills) state.projects[idx].skills = [];
      const normalized = normalizeSkill(val);
      if (!state.projects[idx].skills.includes(normalized)) {
        state.projects[idx].skills.push(normalized);
      }
      input.value = "";
      renderProjectSkillsList(idx);
      updateSmartRecommendations();
    }
  }
};

function renderProjectSkillsList(idx) {
  const listEl = document.getElementById(`project-skills-${idx}`);
  if (!listEl) return;
  const proj = state.projects[idx];
  listEl.innerHTML = (proj.skills || []).map((s, sIdx) => `
    <span class="project-skill-tag">
      ${s}
      <span class="project-skill-remove" onclick="removeProjectSkill(${idx}, ${sIdx})">×</span>
    </span>
  `).join('');
}

// Normalize user input skill names
function normalizeSkill(val) {
  const normMap = {
    "nodejs": "Node.js",
    "node.js": "Node.js",
    "reactjs": "React.js",
    "react.js": "React.js",
    "react": "React.js",
    "postgres": "PostgreSQL",
    "postgresql": "PostgreSQL",
    "js": "JavaScript",
    "javascript": "JavaScript",
    "ts": "TypeScript",
    "typescript": "TypeScript",
    "docker": "Docker",
    "kubernetes": "Kubernetes",
    "k8s": "Kubernetes",
    "nextjs": "Next.js",
    "next.js": "Next.js",
    "express": "Express.js",
    "expressjs": "Express.js",
    "jwt": "JWT",
    "aws": "AWS",
    "nginx": "Nginx",
    "pm2": "PM2",
    "cloudflare": "Cloudflare"
  };
  return normMap[val.trim().toLowerCase()] || val.trim();
}

// Add recommendations support under main inputs
function updateMainRecommendations(inputEl, categoryKey) {
  let parent = inputEl.closest('.field-group');
  let recsDiv = parent.querySelector('.recommendations-container');
  if (!recsDiv) {
    recsDiv = document.createElement('div');
    recsDiv.className = 'recommendations-container';
    parent.appendChild(recsDiv);
  }

  const val = inputEl.value;
  const parts = val.split(',').map(s => s.trim()).filter(s => s.length > 0);
  if (parts.length === 0) {
    recsDiv.innerHTML = '';
    return;
  }

  const lastSkill = parts[parts.length - 1];
  const normalized = normalizeSkill(lastSkill);
  const related = skillIntelligence.relatedSkills[normalized] || [];

  if (related.length === 0) {
    recsDiv.innerHTML = '';
    return;
  }

  recsDiv.innerHTML = `
    <div class="recommendations-title">💡 Complementary Skills for ${normalized}:</div>
    <div class="recommendations-chips">
      ${related.map(skill => `
        <span class="recommendation-chip" onclick="addRecommendedSkillToField('${categoryKey}', '${skill.replace(/'/g, "\\'")}')">+ ${skill}</span>
      `).join('')}
    </div>
  `;
}

window.addRecommendedSkillToField = function(categoryKey, skill) {
  const input = skillInputs[categoryKey];
  if (!input) return;
  const val = input.value.trim();
  const parts = val.split(',').map(s => s.trim()).filter(s => s.length > 0);
  
  if (!parts.includes(skill)) {
    parts.push(skill);
    input.value = parts.join(', ') + ', ';
    state.skills[categoryKey] = input.value;
    updateSkillTagsPreview();
    updateMainRecommendations(input, categoryKey);
    updateSmartRecommendations();
  }
};

// Cross-category intelligence
function updateSmartRecommendations() {
  const panel = document.getElementById("smartRecsPanel");
  const listEl = document.getElementById("smartRecsList");
  if (!panel || !listEl) return;

  const allSelected = new Set();
  Object.values(state.skills).forEach(val => {
    val.split(',').forEach(s => {
      const norm = normalizeSkill(s.trim());
      if (norm) allSelected.add(norm);
    });
  });
  state.projects.forEach(proj => {
    (proj.skills || []).forEach(s => {
      const norm = normalizeSkill(s.trim());
      if (norm) allSelected.add(norm);
    });
  });

  const recommendations = {};
  allSelected.forEach(skill => {
    const related = skillIntelligence.relatedSkills[skill] || [];
    related.forEach(rec => {
      if (!allSelected.has(rec)) {
        recommendations[rec] = (recommendations[rec] || 0) + 1;
      }
    });
  });

  const sortedRecs = Object.entries(recommendations)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, 12);

  if (sortedRecs.length > 0) {
    panel.style.display = "block";
    listEl.innerHTML = sortedRecs.map(skill => {
      let category = "other";
      for (const [cat, skills] of Object.entries(skillIntelligence.skillsByCategory)) {
        if (skills.includes(skill)) {
          category = cat === "DevOps / Cloud" ? "devops" : cat.toLowerCase();
          if (category === "languages" || category === "backend") category = "backend";
          break;
        }
      }
      return `
        <span class="recommendation-chip" onclick="addRecommendedSkillToField('${category}', '${skill.replace(/'/g, "\\'")}')">+ ${skill}</span>
      `;
    }).join('');
  } else {
    panel.style.display = "none";
  }
}

// Autocomplete logic
function initSkillsIntelligence() {
  const popover = document.createElement("div");
  popover.className = "autocomplete-suggestions";
  document.body.appendChild(popover);

  let activeInput = null;
  let activeIndex = -1;
  let currentSuggestions = [];

  function hidePopover() {
    popover.style.display = "none";
    activeIndex = -1;
  }

  function showPopoverForInput(inputEl) {
    const text = inputEl.value;
    let query = "";
    if (inputEl.classList.contains("proj-skills-input")) {
      query = text.trim();
    } else {
      const parts = text.split(',');
      query = parts[parts.length - 1].trim();
    }

    if (!query) {
      hidePopover();
      return;
    }

    currentSuggestions = queryAutocomplete(query, 10);
    if (currentSuggestions.length === 0) {
      hidePopover();
      return;
    }

    const rect = inputEl.getBoundingClientRect();
    popover.style.width = rect.width + "px";
    popover.style.left = rect.left + window.scrollX + "px";
    popover.style.top = rect.bottom + window.scrollY + 4 + "px";
    popover.style.display = "block";

    renderSuggestions();
  }

  function renderSuggestions() {
    popover.innerHTML = currentSuggestions.map((item, idx) => `
      <div class="autocomplete-suggestion ${idx === activeIndex ? 'active' : ''}" data-index="${idx}">
        <span>${item.skill}</span>
        <span class="autocomplete-category">${item.category}</span>
      </div>
    `).join('');
  }

  // Use event delegation for input, focus, and keydown
  document.addEventListener("input", (e) => {
    const target = e.target;
    if (target.classList.contains("skill-input") || target.classList.contains("proj-skills-input")) {
      activeInput = target;
      showPopoverForInput(target);
      if (target.classList.contains("skill-input")) {
        let categoryKey = 'other';
        for (const [key, el] of Object.entries(skillInputs)) {
          if (el === target) {
            categoryKey = key;
            break;
          }
        }
        updateMainRecommendations(target, categoryKey);
      }
      updateSmartRecommendations();
    }
  });

  document.addEventListener("focusin", (e) => {
    const target = e.target;
    if (target.classList.contains("skill-input") || target.classList.contains("proj-skills-input")) {
      activeInput = target;
      showPopoverForInput(target);
      if (target.classList.contains("skill-input")) {
        let categoryKey = 'other';
        for (const [key, el] of Object.entries(skillInputs)) {
          if (el === target) {
            categoryKey = key;
            break;
          }
        }
        updateMainRecommendations(target, categoryKey);
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    const target = e.target;
    if (target.classList.contains("skill-input") || target.classList.contains("proj-skills-input")) {
      if (popover.style.display === "block") {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          activeIndex = (activeIndex + 1) % currentSuggestions.length;
          renderSuggestions();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          activeIndex = (activeIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
          renderSuggestions();
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < currentSuggestions.length) {
            selectSuggestion(currentSuggestions[activeIndex].skill);
          }
        } else if (e.key === "Escape") {
          hidePopover();
        }
      }
    }
  });

  popover.addEventListener("click", (e) => {
    const row = e.target.closest(".autocomplete-suggestion");
    if (row) {
      const idx = parseInt(row.dataset.index);
      if (currentSuggestions[idx]) {
        selectSuggestion(currentSuggestions[idx].skill);
      }
    }
  });

  function selectSuggestion(skill) {
    if (!activeInput) return;
    if (activeInput.classList.contains("proj-skills-input")) {
      const projIdx = parseInt(activeInput.dataset.projIdx);
      if (!isNaN(projIdx)) {
        if (!state.projects[projIdx].skills) state.projects[projIdx].skills = [];
        if (!state.projects[projIdx].skills.includes(skill)) {
          state.projects[projIdx].skills.push(skill);
        }
        activeInput.value = "";
        renderProjectSkillsList(projIdx);
        updateSmartRecommendations();
      }
    } else {
      const val = activeInput.value;
      const parts = val.split(',');
      parts[parts.length - 1] = " " + skill;
      activeInput.value = parts.join(',').trim() + ", ";
      
      let categoryKey = 'other';
      for (const [key, el] of Object.entries(skillInputs)) {
        if (el === activeInput) {
          categoryKey = key;
          break;
        }
      }

      state.skills[categoryKey] = activeInput.value;
      updateSkillTagsPreview();
      updateMainRecommendations(activeInput, categoryKey);
    }
    updateSmartRecommendations();
    hidePopover();
    activeInput.focus();
  }

  document.addEventListener("click", (e) => {
    if (activeInput && !activeInput.contains(e.target) && !popover.contains(e.target)) {
      hidePopover();
    }
  });

  updateSmartRecommendations();
}

/* ═══════════════════════════════════════════════════════════════════
   ✨ ADVANCED GEMINI-POWERED AI SYSTEMS & OPTIMIZATION ENGINE ✨
   ═══════════════════════════════════════════════════════════════════ */

const GEMINI_API_KEY = window.GEMINI_API_KEY || "";

// Central Gemini API content generator
async function callGeminiAPI(promptText) {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: promptText
              }
            ]
          }
        ]
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const json = await response.json();
    if (json.candidates && json.candidates[0] && json.candidates[0].content && json.candidates[0].content.parts && json.candidates[0].content.parts[0]) {
      return json.candidates[0].content.parts[0].text;
    }
    throw new Error("Invalid response schema from API");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

// Safely clean markdown blocks and parse JSON
function cleanAndParseJSON(text) {
  let clean = text.trim();
  if (clean.startsWith("```json")) {
    clean = clean.substring(7);
  } else if (clean.startsWith("```")) {
    clean = clean.substring(3);
  }
  if (clean.endsWith("```")) {
    clean = clean.substring(0, clean.length - 3);
  }
  clean = clean.trim();
  
  try {
    return JSON.parse(clean);
  } catch (e) {
    console.warn("Direct JSON parsing failed, attempting cleanup:", e);
    clean = clean.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
    return JSON.parse(clean);
  }
}

// 1. Single Bullet ATS Optimizer
window.optimizeExperienceBullet = async function(idx, bIdx) {
  const container = document.getElementById(`exp-bullets-${idx}`);
  const row = container?.children[bIdx];
  const input = row?.querySelector('.bullet-input');
  const btn = row?.querySelector('.btn-bullet-optimize');
  
  if (!state.experience[idx] || !state.experience[idx].bullets) return;
  const currentText = state.experience[idx].bullets[bIdx];
  
  if (btn) {
    btn.innerHTML = "⏳";
    btn.disabled = true;
  }
  
  try {
    const prompt = `You are an elite ATS Resume Writer, Tech Recruiter, and Career Coach. 
    Rewrite the following work experience bullet point to make it strong, action-oriented, metric-driven, technical, and highly scan-friendly.
    Target Role: ${state.jobTitle || 'Software Engineer'}
    Original Bullet: "${currentText}"
    Rules:
    - Include a concrete metric/percentage (e.g. "improved query speed by 35%")
    - Begin with a strong action verb
    - Highlight specific modern developer tools/frameworks
    - Output ONLY the optimized bullet point text. No explanations, no markdown, no quotes, no conversational intro/outro.`;
    
    const optimized = await callGeminiAPI(prompt);
    const cleanOpt = optimized.trim().replace(/^["']|["']$/g, '');
    
    state.experience[idx].bullets[bIdx] = cleanOpt;
    if (input) input.value = cleanOpt;
    showToast("✨ Bullet optimized with Gemini AI!");
    renderResumePaper(state);
  } catch (e) {
    console.error(e);
    showToast("❌ Failed to optimize bullet");
  } finally {
    if (btn) {
      btn.innerHTML = "✨";
      btn.disabled = false;
    }
  }
};

window.optimizeProjectBullet = async function(idx, bIdx) {
  const container = document.getElementById(`proj-bullets-${idx}`);
  const row = container?.children[bIdx];
  const input = row?.querySelector('.bullet-input');
  const btn = row?.querySelector('.btn-bullet-optimize');
  
  if (!state.projects[idx] || !state.projects[idx].bullets) return;
  const currentText = state.projects[idx].bullets[bIdx];
  
  if (btn) {
    btn.innerHTML = "⏳";
    btn.disabled = true;
  }
  
  try {
    const prompt = `You are an elite ATS Resume Writer and Tech Recruiter.
    Rewrite the following project description/bullet point to make it metric-driven, architecturally strong, and high-impact.
    Project Name: ${state.projects[idx].name || 'Software Project'}
    Original Bullet: "${currentText}"
    Rules:
    - Include metrics/scale (e.g. "scaled to 10k requests/sec", "reduced load by 25%")
    - Output ONLY the optimized bullet point text. No explanations, no markdown, no quotes, no conversational intro/outro.`;
    
    const optimized = await callGeminiAPI(prompt);
    const cleanOpt = optimized.trim().replace(/^["']|["']$/g, '');
    
    state.projects[idx].bullets[bIdx] = cleanOpt;
    if (input) input.value = cleanOpt;
    showToast("✨ Bullet optimized with Gemini AI!");
    renderResumePaper(state);
  } catch (e) {
    console.error(e);
    showToast("❌ Failed to optimize bullet");
  } finally {
    if (btn) {
      btn.innerHTML = "✨";
      btn.disabled = false;
    }
  }
};

// 2. Project Skill Auto-Inference (AI Infer Button)
window.inferProjectSkillsAI = async function(idx) {
  const proj = state.projects[idx];
  if (!proj) return;
  
  const btn = document.getElementById(`proj-skills-ai-${idx}`);
  if (btn) {
    btn.innerHTML = "⏳ Inferring...";
    btn.style.opacity = "0.7";
  }
  
  try {
    const prompt = `You are a technical hiring manager and skill intelligence engine.
    Analyze the following project details and extract all inferred technical skills, databases, platforms, protocols, or tools that would be required to build this.
    Project Name: ${proj.name}
    Role: ${proj.role}
    Details: ${proj.bullets.join(". ")}
    Return ONLY a valid JSON array of strings containing the inferred skills (e.g. ["Docker", "Nginx", "Linux", "CI/CD", "PostgreSQL", "REST APIs"]).
    No markdown formatting, no explanations, no conversational text.`;
    
    const responseText = await callGeminiAPI(prompt);
    const inferred = cleanAndParseJSON(responseText);
    
    if (Array.isArray(inferred)) {
      if (!proj.skills) proj.skills = [];
      const originalLen = proj.skills.length;
      
      inferred.forEach(skill => {
        const normalized = normalizeSkill(skill);
        if (!proj.skills.includes(normalized)) {
          proj.skills.push(normalized);
        }
      });
      
      if (proj.skills.length !== originalLen) {
        renderProjectSkillsList(idx);
        updateSmartRecommendations();
        renderResumePaper(state);
        showToast("✨ Inferred project skills with Gemini AI!");
      } else {
        showToast("No new skills detected.");
      }
    }
  } catch (e) {
    console.error("AI Skill inference error:", e);
    showToast("❌ Failed to infer skills.");
  } finally {
    if (btn) {
      btn.innerHTML = "✨ AI Infer";
      btn.style.opacity = "1";
    }
  }
};

// 3. Resume Mode & Template Selection
let selectedMode = 'single';

function setupModeAndTemplateEvents() {
  const modeSingleBtn = document.getElementById("modeSingleBtn");
  const modeMultiBtn = document.getElementById("modeMultiBtn");
  const templateSelect = document.getElementById("templateSelect");
  const autoTemplateCheckbox = document.getElementById("autoTemplateCheckbox");
  
  if (modeSingleBtn && modeMultiBtn) {
    modeSingleBtn.addEventListener("click", () => {
      modeSingleBtn.classList.add("active");
      modeSingleBtn.style.background = 'rgba(255, 255, 255, 0.08)';
      modeSingleBtn.style.color = '#fff';
      
      modeMultiBtn.classList.remove("active");
      modeMultiBtn.style.background = 'transparent';
      modeMultiBtn.style.color = 'var(--text-dim)';
      
      selectedMode = 'single';
      renderResumePaper(state);
      showToast("Changed resume mode to Single Page");
    });
    
    modeMultiBtn.addEventListener("click", () => {
      modeMultiBtn.classList.add("active");
      modeMultiBtn.style.background = 'rgba(255, 255, 255, 0.08)';
      modeMultiBtn.style.color = '#fff';
      
      modeSingleBtn.classList.remove("active");
      modeSingleBtn.style.background = 'transparent';
      modeSingleBtn.style.color = 'var(--text-dim)';
      
      selectedMode = 'multi';
      renderResumePaper(state);
      showToast("Changed resume mode to Multi Page");
    });
  }
  
  if (templateSelect) {
    templateSelect.addEventListener("change", () => {
      renderResumePaper(state);
      showToast(`Applied ${templateSelect.options[templateSelect.selectedIndex].text}`);
    });
  }

  const jobTitleInput = document.getElementById("jobTitle");
  if (jobTitleInput) {
    jobTitleInput.addEventListener("input", () => {
      if (autoTemplateCheckbox && autoTemplateCheckbox.checked) {
        runAutoTemplateSelection(jobTitleInput.value);
      }
    });
  }
}

function runAutoTemplateSelection(title) {
  const templateSelect = document.getElementById("templateSelect");
  if (!templateSelect) return;
  
  const cleanTitle = title.trim().toLowerCase();
  let recommended = "modern";
  
  if (cleanTitle.includes("backend") || cleanTitle.includes("systems") || cleanTitle.includes("infrastructure") || cleanTitle.includes("database")) {
    recommended = "compact";
  } else if (cleanTitle.includes("full stack") || cleanTitle.includes("react") || cleanTitle.includes("frontend") || cleanTitle.includes("developer")) {
    recommended = "modern";
  } else if (cleanTitle.includes("senior") || cleanTitle.includes("lead") || cleanTitle.includes("staff") || cleanTitle.includes("manager")) {
    recommended = "enterprise";
  } else if (cleanTitle.includes("executive") || cleanTitle.includes("director") || cleanTitle.includes("vp") || cleanTitle.includes("ceo") || cleanTitle.includes("cto")) {
    recommended = "executive";
  } else if (cleanTitle.includes("startup") || cleanTitle.includes("founder")) {
    recommended = "startup";
  } else if (cleanTitle.includes("researcher") || cleanTitle.includes("research") || cleanTitle.includes("phd") || cleanTitle.includes("academic")) {
    recommended = "multipage";
    const modeMultiBtn = document.getElementById("modeMultiBtn");
    if (modeMultiBtn) modeMultiBtn.click();
  }
  
  if (templateSelect.value !== recommended) {
    templateSelect.value = recommended;
    renderResumePaper(state);
    showToast(`🤖 AI Suggest: Selected ${templateSelect.options[templateSelect.selectedIndex].text} template`);
  }
}

// 4. Copilot Layout Sidebar Panels
function setupCopilotLayout() {
  const navCopilotBtn = document.getElementById("navCopilotBtn");
  const closeCopilotBtn = document.getElementById("closeCopilotBtn");
  const panelCopilot = document.getElementById("panelCopilot");
  const appLayout = document.querySelector(".app-layout");
  
  if (navCopilotBtn && panelCopilot && appLayout) {
    navCopilotBtn.addEventListener("click", () => {
      const isOpen = appLayout.classList.contains("copilot-open");
      if (isOpen) {
        appLayout.classList.remove("copilot-open");
        panelCopilot.style.display = "none";
      } else {
        appLayout.classList.add("copilot-open");
        panelCopilot.style.display = "flex";
        showToast("✨ AI Copilot Panel Opened");
      }
    });
  }
  
  if (closeCopilotBtn && panelCopilot && appLayout) {
    closeCopilotBtn.addEventListener("click", () => {
      appLayout.classList.remove("copilot-open");
      panelCopilot.style.display = "none";
    });
  }
  
  const tabBtns = document.querySelectorAll(".copilot-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      switchCopilotTab(tab);
    });
  });
}

function switchCopilotTab(tabName) {
  document.querySelectorAll('.copilot-tab-btn').forEach(btn => {
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
      btn.style.background = 'rgba(255, 255, 255, 0.08)';
      btn.style.color = '#fff';
    } else {
      btn.classList.remove('active');
      btn.style.background = 'transparent';
      btn.style.color = 'var(--text-dim)';
    }
  });
  
  document.querySelectorAll('.copilot-tab-content').forEach(content => {
    if (content.id === `copilot-tab-${tabName}`) {
      content.classList.add('active');
      content.style.display = 'flex';
    } else {
      content.classList.remove('active');
      content.style.display = 'none';
    }
  });
}

// 5. Chatbot Resume Builder dialogue
let chatSessionData = {
  bullets: [],
  skills: [],
  summary: ""
};

function setupChatbot() {
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const chatMessages = document.getElementById("chatMessages");
  
  if (!chatInput || !chatSendBtn || !chatMessages) return;
  
  chatSendBtn.addEventListener("click", () => handleChatSubmit());
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleChatSubmit();
  });
  
  window.sendQuickMessage = function(msg) {
    chatInput.value = msg;
    handleChatSubmit();
  };
  
  async function handleChatSubmit() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    appendChatMessage(text, "user");
    chatInput.value = "";
    
    const typingId = appendChatMessage("🤖 <em>AI Copilot is composing response...</em>", "ai");
    
    try {
      const prompt = `You are ResumeForge AI Chatbot Builder. The user says: "${text}".
      Convert this input into professional, metric-driven, ATS-optimized resume content.
      You must infer matching technologies, metrics, architectures, business impacts, and return ONLY a valid JSON object matching this schema:
      {
        "suggestedBullets": ["Experience bullet 1", "Experience bullet 2", "Experience bullet 3"],
        "suggestedProjectBullets": ["Project bullet 1", "Project bullet 2"],
        "suggestedSummary": "Professional summary paragraph tailored for a tech developer",
        "inferredSkills": ["Skill1", "Skill2", "Skill3"],
        "recommendedCategory": "frontend" or "backend" or "database" or "devops" or "other"
      }
      Do not output any markdown blocks, explanations, or text outside the JSON.`;
      
      const responseText = await callGeminiAPI(prompt);
      const res = cleanAndParseJSON(responseText);
      
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();
      
      chatSessionData.bullets = res.suggestedBullets || [];
      chatSessionData.skills = res.inferredSkills || [];
      chatSessionData.summary = res.suggestedSummary || "";
      
      const responseHtml = `
        🤖 <strong>AI Suggestion Engine</strong>
        <p style="margin-top:0.25rem; font-size: 0.85rem;">Generated metric-driven resume updates matching your input:</p>
        <ul class="chat-bubble-bullets" style="margin-left: 1rem; margin-top: 0.25rem; list-style: disc; font-size: 0.8rem; gap: 0.25rem; display: flex; flex-direction: column;">
          ${chatSessionData.bullets.map(b => `<li class="chat-bubble-bullet-item">"${b}"</li>`).join('')}
        </ul>
        ${chatSessionData.skills.length > 0 ? `<p style="font-size:0.75rem; margin-top:0.5rem; color:#22d3ee;">💡 Inferred Skills: <strong>${chatSessionData.skills.join(', ')}</strong></p>` : ''}
        ${chatSessionData.summary ? `<p style="font-size:0.75rem; margin-top:0.3rem; color:#a78bfa;">📝 Summary Idea: <em>"${chatSessionData.summary}"</em></p>` : ''}
        <div class="chat-actions" style="margin-top: 0.6rem; display: flex; gap: 0.4rem; flex-wrap: wrap;">
          <button class="btn-chat-action primary" onclick="acceptChatBullets()" style="background: var(--primary); border: none; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Insert Bullets</button>
          ${chatSessionData.skills.length > 0 ? `<button class="btn-chat-action secondary" onclick="acceptChatSkills()" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Add Inferred Skills</button>` : ''}
          ${chatSessionData.summary ? `<button class="btn-chat-action secondary" onclick="acceptChatSummary()" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Apply Summary</button>` : ''}
        </div>
      `;
      appendChatMessage(responseHtml, "ai");
    } catch (e) {
      console.error(e);
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();
      appendChatMessage("❌ Sorry, I encountered an error communicating with Gemini. Please try again.", "ai");
    }
  }
  
  function appendChatMessage(html, sender) {
    const msgId = "chat-msg-" + Date.now();
    const div = document.createElement("div");
    div.id = msgId;
    div.className = `chat-message ${sender}`;
    div.innerHTML = html;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgId;
  }
}

window.acceptChatBullets = function() {
  if (chatSessionData.bullets.length === 0) return;
  if (state.experience.length === 0) {
    state.experience.push({
      company: "Company Name",
      role: state.jobTitle || "Software Engineer",
      location: "City, Country",
      startDate: "",
      endDate: "Present",
      bullets: []
    });
  }
  
  state.experience[0].bullets.push(...chatSessionData.bullets);
  renderExperienceList();
  renderResumePaper(state);
  showToast("✨ Inserted optimized bullets into Work Experience!");
};

window.acceptChatSkills = function() {
  if (chatSessionData.skills.length === 0) return;
  
  chatSessionData.skills.forEach(skill => {
    let targetCategory = "other";
    for (const [cat, skills] of Object.entries(skillIntelligence.skillsByCategory)) {
      if (skills.includes(skill)) {
        targetCategory = cat;
        break;
      }
    }
    
    const input = skillInputs[targetCategory];
    if (input) {
      const val = input.value.trim();
      const parts = val.split(',').map(s => s.trim()).filter(s => s.length > 0);
      if (!parts.includes(skill)) {
        parts.push(skill);
        input.value = parts.join(', ') + ', ';
        state.skills[targetCategory] = input.value;
      }
    }
  });
  
  updateSkillTagsPreview();
  renderResumePaper(state);
  updateSmartRecommendations();
  showToast("💡 Added inferred skills to categories!");
};

window.acceptChatSummary = function() {
  if (!chatSessionData.summary) return;
  state.summary = chatSessionData.summary;
  const summaryInput = document.getElementById("summary");
  if (summaryInput) {
    summaryInput.value = state.summary;
    const summaryCount = document.getElementById("summaryCount");
    if (summaryCount) summaryCount.innerText = state.summary.length;
  }
  renderResumePaper(state);
  showToast("📝 Summary updated with AI suggestion!");
};

// 6. Job Description Analyzer & Auto-Inject
let jdMissingSkills = [];
let jdOptimizedSummary = "";

function setupJdAnalyzer() {
  const jdAnalyzeBtn = document.getElementById("jdAnalyzeBtn");
  const jdInput = document.getElementById("jdInput");
  const jdResults = document.getElementById("jdResults");
  const jdScoreArc = document.getElementById("jdScoreArc");
  const jdScoreNumber = document.getElementById("jdScoreNumber");
  const jdMatchMessage = document.getElementById("jdMatchMessage");
  const jdMissingKeywords = document.getElementById("jdMissingKeywords");
  const jdSuggestions = document.getElementById("jdSuggestions");
  const jdInjectBtn = document.getElementById("jdInjectBtn");
  
  if (!jdAnalyzeBtn || !jdInput) return;
  
  jdAnalyzeBtn.addEventListener("click", async () => {
    const jdText = jdInput.value.trim();
    if (!jdText) {
      showToast("Please paste a Job Description first.");
      return;
    }
    
    jdAnalyzeBtn.innerHTML = "⏳ Analyzing...";
    jdAnalyzeBtn.disabled = true;
    
    try {
      const prompt = `You are ResumeForge AI Job Description Analyzer, working as a senior recruiter and career assistant.
      Analyze the following Job Description against the user's current resume.
      Resume JSON: ${JSON.stringify(state)}
      Job Description: ${jdText}
      Return ONLY a valid JSON object matching the exact schema:
      {
        "role": "Role Title",
        "seniority": "Junior/Mid/Senior/Lead",
        "requiredSkills": ["skill1", "skill2"],
        "preferredSkills": ["skill3", "skill4"],
        "atsKeywords": ["kw1", "kw2"],
        "industryTerms": ["term1", "term2"],
        "responsibilities": ["resp1", "resp2"],
        "missingKeywords": ["missingSkill1", "missingSkill2"],
        "resumeRecommendations": ["Rec1: add experience details...", "Rec2: include technical stack..."],
        "keywordMatchScore": 65,
        "optimizedSummary": "A highly customized professional summary matching this job description perfectly.",
        "recommendedSkills": ["recSkill1", "recSkill2"]
      }
      Do not output any markdown formatting, explanations, or conversational filler.`;
      
      const responseText = await callGeminiAPI(prompt);
      const analysis = cleanAndParseJSON(responseText);
      
      jdMissingSkills = analysis.missingKeywords || [];
      jdOptimizedSummary = analysis.optimizedSummary || "";
      
      const score = analysis.keywordMatchScore || 50;
      jdScoreNumber.innerText = `${score}%`;
      jdScoreArc.setAttribute("stroke-dasharray", `${score}, 100`);
      
      if (score >= 80) {
        jdScoreArc.setAttribute("stroke", "#10b981");
        jdMatchMessage.innerHTML = "🏆 Excellent ATS match! Ready to apply.";
      } else if (score >= 55) {
        jdScoreArc.setAttribute("stroke", "#f59e0b");
        jdMatchMessage.innerHTML = "⚠️ Solid, but missing key technical requirements.";
      } else {
        jdScoreArc.setAttribute("stroke", "#ef4444");
        jdMatchMessage.innerHTML = "❌ Poor match. High risk of ATS rejection.";
      }
      
      jdMissingKeywords.innerHTML = jdMissingSkills.map(kw => `
        <span class="skill-tag" style="background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); color: #f87171;">${kw}</span>
      `).join('');
      
      if (jdMissingSkills.length === 0) {
        jdMissingKeywords.innerHTML = `<span style="font-size:0.75rem; color:#10b981;">None! You match all major tech requirements.</span>`;
      }
      
      const recs = analysis.resumeRecommendations || [];
      jdSuggestions.innerHTML = recs.map(s => `
        <li style="display:flex; align-items:start; gap:0.4rem; font-size:0.8rem; margin-bottom:0.25rem;">
          <span style="color:#ef4444;">•</span>
          <span>${s}</span>
        </li>
      `).join('');
      
      if (jdOptimizedSummary) {
        const applySummaryBtn = document.createElement("button");
        applySummaryBtn.type = "button";
        applySummaryBtn.className = "btn-chat-action secondary";
        applySummaryBtn.style.marginTop = "0.5rem";
        applySummaryBtn.style.width = "100%";
        applySummaryBtn.style.padding = "6px";
        applySummaryBtn.style.fontSize = "0.75rem";
        applySummaryBtn.style.cursor = "pointer";
        applySummaryBtn.innerHTML = "⚡ Apply Optimized Summary to Resume";
        applySummaryBtn.onclick = () => {
          state.summary = jdOptimizedSummary;
          const summaryInput = document.getElementById("summary");
          if (summaryInput) {
            summaryInput.value = state.summary;
            const summaryCount = document.getElementById("summaryCount");
            if (summaryCount) summaryCount.innerText = state.summary.length;
          }
          renderResumePaper(state);
          showToast("📝 Summary tailored to Job Description!");
        };
        jdSuggestions.appendChild(applySummaryBtn);
      }
      
      jdResults.style.display = "flex";
      showToast("📊 Job Description analyzed!");
    } catch (e) {
      console.error(e);
      showToast("❌ Failed to analyze Job Description.");
    } finally {
      jdAnalyzeBtn.innerHTML = "Analyze Job Description";
      jdAnalyzeBtn.disabled = false;
    }
  });
  
  if (jdInjectBtn) {
    jdInjectBtn.addEventListener("click", () => {
      if (jdMissingSkills.length === 0) {
        showToast("No missing skills to inject.");
        return;
      }
      
      jdMissingSkills.forEach(skill => {
        let targetCategory = "other";
        for (const [cat, skills] of Object.entries(skillIntelligence.skillsByCategory)) {
          if (skills.includes(skill)) {
            targetCategory = cat;
            break;
          }
        }
        
        const input = skillInputs[targetCategory];
        if (input) {
          const val = input.value.trim();
          const parts = val.split(',').map(s => s.trim()).filter(s => s.length > 0);
          if (!parts.includes(skill)) {
            parts.push(skill);
            input.value = parts.join(', ') + ', ';
            state.skills[targetCategory] = input.value;
          }
        }
      });
      
      updateSkillTagsPreview();
      renderResumePaper(state);
      updateSmartRecommendations();
      
      jdMissingKeywords.innerHTML = `<span style="font-size:0.75rem; color:#10b981;">Injected! Re-run analysis to update.</span>`;
      showToast("✨ Missing keywords injected and ATS score boosted!");
    });
  }
}

// 7. Old CV Parser + Drag & Drop
function setupCvParser() {
  const parserDropZone = document.getElementById("parserDropZone");
  const parserFileInput = document.getElementById("parserFileInput");
  const parserTextInput = document.getElementById("parserTextInput");
  const parserParseBtn = document.getElementById("parserParseBtn");
  const dropZoneText = document.getElementById("dropZoneText");
  
  if (!parserDropZone || !parserParseBtn) return;
  
  parserDropZone.addEventListener("click", () => parserFileInput.click());
  
  parserDropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    parserDropZone.style.borderColor = "var(--primary)";
    parserDropZone.style.background = "rgba(139, 92, 246, 0.05)";
  });
  
  parserDropZone.addEventListener("dragleave", () => {
    parserDropZone.style.borderColor = "rgba(139, 92, 246, 0.3)";
    parserDropZone.style.background = "rgba(139, 92, 246, 0.02)";
  });
  
  parserDropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    parserDropZone.style.borderColor = "rgba(139, 92, 246, 0.3)";
    parserDropZone.style.background = "rgba(139, 92, 246, 0.02)";
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleParsedFile(files[0]);
    }
  });
  
  parserFileInput.addEventListener("change", () => {
    if (parserFileInput.files.length > 0) {
      handleParsedFile(parserFileInput.files[0]);
    }
  });
  
  function handleParsedFile(file) {
    dropZoneText.innerText = `Uploaded: ${file.name}`;
    dropZoneText.style.color = "#a78bfa";
    
    const reader = new FileReader();
    reader.onload = (e) => {
      parserTextInput.value = e.target.result;
    };
    reader.readAsText(file);
  }
  
  parserParseBtn.addEventListener("click", async () => {
    const rawText = parserTextInput.value.trim();
    if (!rawText) {
      showToast("Please upload a file or paste CV text first.");
      return;
    }
    
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = loadingOverlay?.querySelector('.loading-text');
    if (loadingOverlay && loadingText) {
      loadingText.innerText = "Parsing Old Resume Structure using Gemini AI...";
      loadingOverlay.classList.add("active");
    }
    
    try {
      const prompt = `You are an elite Resume Parser and Tech Recruiter.
      Parse the following raw resume text and return a valid JSON object matching the exact schema below.
      Infer missing fields intelligently. Ensure all experience and project bullet points are action-oriented, technical, and optimized.
      
      STRICT JSON SCHEMA:
      {
        "personal": {
          "fullName": "",
          "jobTitle": "",
          "email": "",
          "phone": "",
          "location": "",
          "linkedin": "",
          "github": "",
          "portfolio": ""
        },
        "summary": "",
        "skillsByCategory": {
          "frontend": "Frontend skills list (React, HTML, CSS, JavaScript, etc.)",
          "backend": "Backend skills list (Node, APIs, Python, etc.)",
          "database": "Database skills list (SQL, Postgres, etc.)",
          "devops": "DevOps skills list (Docker, CI/CD, Nginx, etc.)",
          "other": "Other tools / certifications / libraries list"
        },
        "experience": [
          {
            "company": "Company Name",
            "role": "Role / Job Title",
            "location": "City, Country",
            "startDate": "YYYY-MM",
            "endDate": "YYYY-MM or Present",
            "bullets": ["Action + Tech + Scale + Impact achievement bullets"]
          }
        ],
        "projects": [
          {
            "name": "Project Name",
            "role": "Role / Lead",
            "link": "Link / GitHub URL",
            "skills": ["Skill1", "Skill2"],
            "bullets": ["Project achievement description bullets"]
          }
        ],
        "education": [
          {
            "institution": "University Name",
            "degree": "Degree and Major",
            "location": "City, Country",
            "year": "YYYY - YYYY"
          }
        ]
      }
      
      Resume text to parse:
      ${rawText}
      
      Do not output any markdown blocks, explanations, or text outside the JSON.`;
      
      const responseText = await callGeminiAPI(prompt);
      const parsed = cleanAndParseJSON(responseText);
      
      state.fullName = parsed.personal?.fullName || state.fullName;
      state.jobTitle = parsed.personal?.jobTitle || state.jobTitle;
      state.email = parsed.personal?.email || state.email;
      state.phone = parsed.personal?.phone || state.phone;
      state.location = parsed.personal?.location || state.location;
      state.linkedin = parsed.personal?.linkedin || state.linkedin;
      state.github = parsed.personal?.github || state.github;
      state.portfolio = parsed.personal?.portfolio || state.portfolio;
      
      state.summary = parsed.summary || state.summary;
      
      if (parsed.skillsByCategory) {
        state.skills.frontend = parsed.skillsByCategory.frontend || state.skills.frontend;
        state.skills.backend = parsed.skillsByCategory.backend || state.skills.backend;
        state.skills.database = parsed.skillsByCategory.database || state.skills.database;
        state.skills.devops = parsed.skillsByCategory.devops || state.skills.devops;
        state.skills.other = parsed.skillsByCategory.other || state.skills.other;
      }
      
      state.experience = parsed.experience || state.experience;
      state.projects = parsed.projects || state.projects;
      state.education = parsed.education || state.education;
      
      populateForm();
      renderResumePaper(state);
      
      showToast("✨ Resume parsed successfully! Builder forms autofilled.");
    } catch (e) {
      console.error(e);
      showToast("❌ Failed to parse resume text.");
    } finally {
      if (loadingOverlay) loadingOverlay.classList.remove("active");
    }
  });
}

// 8. Bulk Bullet Optimizer
let pendingOptimizations = [];

function setupBulkOptimizer() {
  const bulkOptimizeTrigger = document.getElementById("bulkOptimizeTrigger");
  const optimizerModal = document.getElementById("optimizerModal");
  const optimizerModalBody = document.getElementById("optimizerModalBody");
  const closeOptimizerModal = document.getElementById("closeOptimizerModal");
  const acceptAllOptimizations = document.getElementById("acceptAllOptimizations");
  const rejectAllOptimizations = document.getElementById("rejectAllOptimizations");
  
  if (!bulkOptimizeTrigger || !optimizerModal) return;
  
  bulkOptimizeTrigger.addEventListener("click", async () => {
    pendingOptimizations = [];
    
    const bulletsToOptimize = [];
    
    state.experience.forEach((exp, expIdx) => {
      exp.bullets.forEach((b, bIdx) => {
        bulletsToOptimize.push({
          type: "experience",
          parentIdx: expIdx,
          bulletIdx: bIdx,
          label: `${exp.company} (Role: ${exp.role})`,
          original: b
        });
      });
    });
    
    state.projects.forEach((proj, projIdx) => {
      proj.bullets.forEach((b, bIdx) => {
        bulletsToOptimize.push({
          type: "project",
          parentIdx: projIdx,
          bulletIdx: bIdx,
          label: `Project: ${proj.name}`,
          original: b
        });
      });
    });
    
    if (bulletsToOptimize.length === 0) {
      showToast("No bullets available to optimize.");
      return;
    }
    
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = loadingOverlay?.querySelector('.loading-text');
    if (loadingOverlay && loadingText) {
      loadingText.innerText = "Batch Optimizing all bullets with Gemini AI...";
      loadingOverlay.classList.add("active");
    }
    
    try {
      const prompt = `You are an elite ATS Resume Writer.
      For each of the following resume bullets, rewrite it to be strong, action-oriented, metric-driven, and technical, optimized for the target role: ${state.jobTitle || 'Software Developer'}.
      
      Bullets to optimize (JSON list):
      ${JSON.stringify(bulletsToOptimize.map(b => ({ original: b.original, label: b.label })))}
      
      Return ONLY a valid JSON array of objects with the exact schema:
      [
        {
          "original": "original bullet",
          "optimized": "optimized bullet"
        }
      ]
      No explanations, no markdown blocks, no conversational text.`;
      
      const responseText = await callGeminiAPI(prompt);
      const optimizedList = cleanAndParseJSON(responseText);
      
      if (Array.isArray(optimizedList)) {
        bulletsToOptimize.forEach((bItem, bIdx) => {
          const optMatch = optimizedList.find(o => o.original === bItem.original);
          const optimizedVal = optMatch ? optMatch.optimized : bItem.original;
          
          if (bItem.original.trim() !== optimizedVal.trim()) {
            pendingOptimizations.push({
              type: bItem.type,
              parentIdx: bItem.parentIdx,
              bulletIdx: bItem.bulletIdx,
              label: bItem.label,
              original: bItem.original,
              optimized: optimizedVal
            });
          }
        });
      }
      
      if (pendingOptimizations.length === 0) {
        showToast("✨ All bullets are already highly ATS-optimized!");
        if (loadingOverlay) loadingOverlay.classList.remove("active");
        return;
      }
      
      optimizerModalBody.innerHTML = pendingOptimizations.map((item, idx) => `
        <div class="optimize-diff-row">
          <div class="diff-header-row">
            <span class="diff-section-tag">${item.type.toUpperCase()}</span>
            <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">${item.label}</span>
          </div>
          <div class="diff-before" style="background: rgba(239, 68, 68, 0.08); border: 1px dashed rgba(239, 68, 68, 0.2); padding: 6px; border-radius: 4px; color: #ef4444; font-size: 0.85rem; margin-top: 4px;">
            <strong>Before:</strong> "${item.original}"
          </div>
          <div class="diff-after" style="background: rgba(16, 185, 129, 0.08); border: 1px dashed rgba(16, 185, 129, 0.2); padding: 6px; border-radius: 4px; color: #10b981; font-size: 0.85rem; margin-top: 4px;">
            <strong>After:</strong> "${item.optimized}"
          </div>
        </div>
      `).join('');
      
      if (loadingOverlay) loadingOverlay.classList.remove("active");
      optimizerModal.style.display = "flex";
    } catch (e) {
      console.error(e);
      if (loadingOverlay) loadingOverlay.classList.remove("active");
      showToast("❌ Failed to batch optimize bullets.");
    }
  });
  
  const closeModal = () => { optimizerModal.style.display = "none"; };
  closeOptimizerModal.addEventListener("click", closeModal);
  optimizerModal.addEventListener("click", (e) => {
    if (e.target === optimizerModal) closeModal();
  });
  
  rejectAllOptimizations.addEventListener("click", () => {
    closeModal();
    showToast("All optimizations rejected.");
  });
  
  acceptAllOptimizations.addEventListener("click", () => {
    pendingOptimizations.forEach(item => {
      if (item.type === "experience") {
        state.experience[item.parentIdx].bullets[item.bulletIdx] = item.optimized;
      } else if (item.type === "project") {
        state.projects[item.parentIdx].bullets[item.bulletIdx] = item.optimized;
      }
    });
    
    renderExperienceList();
    renderProjectList();
    renderResumePaper(state);
    
    closeModal();
    showToast("✨ Applied all optimized bullets to the builder!");
  });
}

// ===================================================
// 9. FULL ATS RESUME OPTIMIZER (Complete Resume Pass)
// ===================================================
function setupFullAtsOptimizer() {
  const runBtn = document.getElementById("fullOptimizerRunBtn");
  const promptInput = document.getElementById("fullOptimizerPrompt");
  const resultsDiv = document.getElementById("fullOptimizerResults");
  if (!runBtn || !promptInput || !resultsDiv) return;

  runBtn.addEventListener("click", async () => {
    const userPrompt = promptInput.value.trim() || "Optimize for my target role and maximize ATS score to 95+";
    const { score: currentScore } = calculateAtsScore(state);

    runBtn.innerHTML = `<span class="btn-generate-inner" style="font-size:0.9rem">⏳ AI Analyzing Full Resume...</span>`;
    runBtn.disabled = true;
    resultsDiv.style.display = "none";

    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = loadingOverlay?.querySelector('.loading-text');
    const loadingSub = loadingOverlay?.querySelector('.loading-sub');
    if (loadingOverlay && loadingText) {
      loadingText.innerText = "Running Full ATS Optimization Engine";
      if (loadingSub) loadingSub.innerText = "Analyzing weaknesses · Rewriting bullets · Boosting keyword density";
      loadingOverlay.classList.add("active");
    }

    try {
      const prompt = `You are ResumeForge AI ATS Optimizer.

Current resume state is provided.

User instruction: ${userPrompt}

Current ATS score: ${currentScore}

Goal: Increase ATS score toward 95+.

IMPORTANT RULES:
Never remove projects.
Never remove experience.
Never delete education.
Preserve all user information.
Only improve.

Tasks:
1. Analyze current resume.
2. Detect weaknesses: missing keywords, weak bullets, bad formatting, poor readability, missing technologies, weak summaries.
3. Improve intelligently: stronger ATS wording, better keyword density, better project bullets, stronger summaries, technology inference, skill enhancement.
4. Role targeting: adapt resume for the user instruction. Add matching terminology, keywords, API engineering terms, database optimization keywords.
5. Content rewriting. Weak: "Worked on APIs." Strong: "Designed scalable REST APIs using Node.js and PostgreSQL supporting 50k+ daily transactional workloads."
6. Boost keyword density for Workday, Greenhouse, Lever, Taleo, Ashby ATS parsers.

Current Resume JSON:
${JSON.stringify(state)}

Return ONLY a valid JSON object. No markdown. Only JSON:
{
  "issuesFound": ["issue 1", "issue 2"],
  "changesApplied": ["change 1", "change 2"],
  "atsBefore": ${currentScore},
  "atsAfter": 0,
  "optimizedResume": {
    "fullName": "",
    "jobTitle": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "portfolio": "",
    "summary": "",
    "targetRole": "",
    "skills": { "frontend": "", "backend": "", "database": "", "devops": "", "other": "" },
    "experience": [{"company":"","role":"","location":"","startDate":"","endDate":"","bullets":[]}],
    "projects": [{"name":"","role":"","link":"","skills":[],"bullets":[]}],
    "education": [{"institution":"","degree":"","location":"","year":""}]
  }
}`;

      const responseText = await callGeminiAPI(prompt);
      const result = cleanAndParseJSON(responseText);

      if (!result || !result.optimizedResume) throw new Error("Invalid optimizer response");

      window._lastFullOptimizerResult = result;

      const issues = result.issuesFound || [];
      const changes = result.changesApplied || [];
      const atsBefore = result.atsBefore ?? currentScore;
      const atsAfter = Math.min(result.atsAfter ?? (atsBefore + 12), 99);
      const delta = atsAfter - atsBefore;
      const deltaColor = delta > 0 ? "#34d399" : "#f87171";
      const deltaSign = delta > 0 ? "+" : "";
      const afterStroke = atsAfter >= 85 ? "#10b981" : atsAfter >= 65 ? "#f59e0b" : "#ef4444";

      resultsDiv.innerHTML = `
        <div class="full-opt-score-row">
          <div class="full-opt-score-item">
            <div class="full-opt-ring-wrap">
              <svg viewBox="0 0 36 36" class="full-opt-svg">
                <path class="full-opt-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                <path class="full-opt-fill" stroke-dasharray="${atsBefore}, 100" stroke="#f59e0b" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
              </svg>
              <span class="full-opt-num">${atsBefore}</span>
            </div>
            <div class="full-opt-score-label">Before</div>
          </div>
          <div class="full-opt-arrow-col">
            <div class="full-opt-delta" style="color:${deltaColor}">${deltaSign}${delta}</div>
            <div class="full-opt-arrow">→</div>
          </div>
          <div class="full-opt-score-item">
            <div class="full-opt-ring-wrap">
              <svg viewBox="0 0 36 36" class="full-opt-svg">
                <path class="full-opt-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                <path class="full-opt-fill" id="afterScoreArc" stroke-dasharray="0, 100" stroke="${afterStroke}" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
              </svg>
              <span class="full-opt-num" id="afterScoreNum">0</span>
            </div>
            <div class="full-opt-score-label" style="color:#34d399">After</div>
          </div>
        </div>

        ${issues.length > 0 ? `
        <div class="full-opt-section">
          <div class="full-opt-section-title" style="color:#f87171">⚠ Issues Found (${issues.length})</div>
          <div class="full-opt-issues-grid">
            ${issues.map(i => `<span class="full-opt-issue-chip">${i}</span>`).join('')}
          </div>
        </div>` : ''}

        ${changes.length > 0 ? `
        <div class="full-opt-section">
          <div class="full-opt-section-title" style="color:#34d399">✅ Changes Applied (${changes.length})</div>
          <ul class="full-opt-changes-list">
            ${changes.map(c => `<li>• ${c}</li>`).join('')}
          </ul>
        </div>` : ''}

        <div style="display:flex;gap:0.5rem;">
          <button onclick="applyFullOptimizedResume()" class="full-opt-apply-btn">⚡ Apply to Builder</button>
          <button onclick="rejectFullOptimizer()" class="full-opt-reject-btn">✕ Discard</button>
        </div>
      `;

      resultsDiv.style.display = "flex";

      // Animate after score
      setTimeout(() => {
        const arc = document.getElementById("afterScoreArc");
        const num = document.getElementById("afterScoreNum");
        if (arc) arc.setAttribute("stroke-dasharray", `${atsAfter}, 100`);
        if (num) {
          let count = atsBefore;
          const step = () => {
            if (count < atsAfter) { count++; num.innerText = count; requestAnimationFrame(step); }
            else { num.innerText = atsAfter; }
          };
          requestAnimationFrame(step);
        }
      }, 150);

      if (loadingOverlay) loadingOverlay.classList.remove("active");
      showToast("✨ Full ATS Optimization complete! Review and apply.");
    } catch (e) {
      console.error("Full Optimizer error:", e);
      if (loadingOverlay) loadingOverlay.classList.remove("active");
      showToast("❌ Optimization failed. Please try again.");
    } finally {
      runBtn.innerHTML = `<span class="btn-generate-inner" style="font-size:0.9rem;font-weight:800">⚡ Run Full ATS Optimizer</span>`;
      runBtn.disabled = false;
    }
  });
}

window.applyFullOptimizedResume = function() {
  const result = window._lastFullOptimizerResult;
  if (!result || !result.optimizedResume) { showToast("No optimization result to apply."); return; }
  const r = result.optimizedResume;

  // Apply personal info (preserve if AI left blank)
  if (r.fullName)   state.fullName   = r.fullName;
  if (r.jobTitle)   state.jobTitle   = r.jobTitle;
  if (r.email)      state.email      = r.email;
  if (r.phone)      state.phone      = r.phone;
  if (r.location)   state.location   = r.location;
  if (r.linkedin)   state.linkedin   = r.linkedin;
  if (r.github)     state.github     = r.github;
  if (r.portfolio)  state.portfolio  = r.portfolio;
  if (r.summary)    state.summary    = r.summary;
  if (r.targetRole) state.targetRole = r.targetRole;

  if (r.skills) {
    if (r.skills.frontend) state.skills.frontend = r.skills.frontend;
    if (r.skills.backend)  state.skills.backend  = r.skills.backend;
    if (r.skills.database) state.skills.database = r.skills.database;
    if (r.skills.devops)   state.skills.devops   = r.skills.devops;
    if (r.skills.other)    state.skills.other    = r.skills.other;
  }
  // RULES: Never remove — only update if AI returned them
  if (r.experience && r.experience.length > 0) state.experience = r.experience;
  if (r.projects   && r.projects.length   > 0) state.projects   = r.projects;
  if (r.education  && r.education.length  > 0) state.education  = r.education;

  populateForm();
  renderResumePaper(state);

  const { score } = calculateAtsScore(state);
  scoreNumber.innerText = score + "%";
  scoreArc.style.strokeDasharray = `${score}, 100`;

  const resultsDiv = document.getElementById("fullOptimizerResults");
  if (resultsDiv) resultsDiv.style.display = "none";
  showToast("✨ Optimized resume applied! Regenerate to see the full preview.");
  handleGenerate();
};

window.rejectFullOptimizer = function() {
  window._lastFullOptimizerResult = null;
  const resultsDiv = document.getElementById("fullOptimizerResults");
  if (resultsDiv) resultsDiv.style.display = "none";
  showToast("Optimization discarded.");
};

// Expose strict JSON state output format
window.getResumeStateJSON = function() {
  const atsScoreVal = parseInt(document.getElementById("jdScoreNumber")?.innerText) || 95;
  const currentTemplate = document.getElementById("templateSelect")?.value || "modern";
  
  return {
    "resumeMode": selectedMode,
    "template": currentTemplate,
    "atsScore": atsScoreVal,
    "personal": {
      "fullName": state.fullName || "",
      "jobTitle": state.jobTitle || "",
      "email": state.email || "",
      "phone": state.phone || "",
      "location": state.location || "",
      "linkedin": state.linkedin || "",
      "github": state.github || "",
      "portfolio": state.portfolio || ""
    },
    "summary": state.summary || "",
    "skillsByCategory": {
      "frontend": state.skills?.frontend || "",
      "backend": state.skills?.backend || "",
      "database": state.skills?.database || "",
      "devops": state.skills?.devops || "",
      "other": state.skills?.other || ""
    },
    "experience": state.experience || [],
    "projects": state.projects || [],
    "education": state.education || [],
    "certifications": state.certifications || [],
    "recommendations": state.recommendations || [],
    "missingKeywords": jdMissingSkills || [],
    "jdAnalysis": {
      "role": state.jobTitle || "",
      "missingKeywords": jdMissingSkills || []
    }
  };
};

// Initialize system
window.addEventListener("DOMContentLoaded", () => {
  initParticles();
  populateForm();
  initSkillsIntelligence();
  
  // Setup advanced AI Copilot systems
  setupModeAndTemplateEvents();
  setupCopilotLayout();
  setupChatbot();
  setupJdAnalyzer();
  setupCvParser();
  setupBulkOptimizer();
  setupFullAtsOptimizer();
  
  // Bind Export ATS JSON button
  const btnExportAtsJson = document.getElementById("btnExportAtsJson");
  if (btnExportAtsJson) {
    btnExportAtsJson.addEventListener("click", () => {
      const json = window.getResumeStateJSON();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `${state.fullName.replace(/\s+/g, '_')}_ATS_Resume_State.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("✨ Exported strict ATS State JSON!");
    });
  }
  
  const jobTitleInput = document.getElementById("jobTitle");
  if (jobTitleInput && jobTitleInput.value) {
    runAutoTemplateSelection(jobTitleInput.value);
  }
});
