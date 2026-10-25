const CONTACT_EMAIL = "dubeyankush292@gmail.com";
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const toast = document.querySelector("#toast");
const progress = document.querySelector("#scroll-progress");
const glow = document.querySelector("#cursor-glow");
const header = document.querySelector(".site-header");

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#email-link").href = `mailto:${CONTACT_EMAIL}`;
document.querySelector("#contact-email").textContent = CONTACT_EMAIL;

document.querySelector("#copy-email").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    showToast("Email address copied");
  } catch {
    showToast(`Email: ${CONTACT_EMAIL}`);
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
}

let scrollTicking = false;
function updateScrollUI() {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${percent}%`;
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
    scrollTicking = false;
  });
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

if (glow && window.matchMedia("(hover:hover) and (pointer:fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("pointermove", event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.transform = `translateY(-4px) perspective(900px) rotateX(${(0.5 - y) * 2}deg) rotateY(${(x - 0.5) * 2}deg)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(".project-card, .service-row, .about-copy, .stack-cloud");
  targets.forEach(el => { el.classList.add("reveal-pending"); });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(el => observer.observe(el));
}


// Lightweight portfolio guide. This is a local scripted demo, not a live LLM.
const aiLauncher = document.querySelector("#ai-launcher");
const aiPanel = document.querySelector("#ai-panel");
const aiClose = document.querySelector("#ai-close");
const aiMessages = document.querySelector("#ai-messages");
const aiForm = document.querySelector("#ai-form");
const aiInput = document.querySelector("#ai-input");

function setGuideOpen(open) {
  aiPanel.hidden = !open;
  aiLauncher.setAttribute("aria-expanded", String(open));
  if (open) window.setTimeout(() => aiInput.focus(), 80);
}
aiLauncher.addEventListener("click", () => setGuideOpen(aiPanel.hidden));
aiClose.addEventListener("click", () => setGuideOpen(false));

function addGuideMessage(text, role) {
  const message = document.createElement("div");
  message.className = `ai-message ${role === "user" ? "ai-user" : "ai-bot"}`;
  message.textContent = text;
  aiMessages.appendChild(message);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}
function guideReply(question) {
  const q = question.toLowerCase();
  if (/e.?commerce|shopware|prestashop|store|product|commerce/.test(q))
    return "Ankush works on ecommerce storefronts and connected commerce workflows: Shopware 6, PrestaShop, product/catalog content, pricing and stock synchronization, and API integrations. See the linked projects at the top of the Work section.";
  if (/crm|odoo|erp|business data/.test(q))
    return "His business-platform experience includes Odoo, React/Next.js interfaces, REST APIs, Docker deployments, data synchronization, and workflow tools focused on reliability and usability.";
  if (/ai|artificial intelligence|automation/.test(q))
    return "Ankush is interested in practical AI-enabled products and automation that solve real workflows. This portfolio guide is currently a scripted demo; a live AI assistant can be connected to a backend/API as a separate feature.";
  if (/skill|technology|stack|tech|build|can you/.test(q))
    return "Core stack: JavaScript, React, Next.js, Python, Odoo, Shopware, Docker, REST APIs, integrations, and automation. He can help with web apps, ecommerce systems, internal tools, and technical consulting.";
  if (/hire|contact|work together|project|budget|available|collaborat/.test(q))
    return "For a project or consulting conversation, email dubeyankush292@gmail.com. Share the goal, current stack, key constraints, and timeline, and Ankush can discuss a practical approach.";
  if (/woozchain|wooz/.test(q))
    return "Woozchain is one of the featured live projects. Open the Woozchain card near the top of the Work section to visit https://woozchain.com/.";
  if (/cagi|geneva|international geneva/.test(q))
    return "CAGI — International Geneva is featured among the linked projects. Open its card in the Work section to visit https://www.cagi.ch/en/.";
  return "I can help you explore Ankush’s skills, CRM/business platforms, ecommerce integrations, automation, and featured live projects. Try asking “What can you build?” or “Tell me about ecommerce experience.” For a real conversation, email dubeyankush292@gmail.com.";
}
function sendGuidePrompt(value) {
  const question = value.trim();
  if (!question) return;
  addGuideMessage(question, "user");
  aiInput.value = "";
  window.setTimeout(() => addGuideMessage(guideReply(question), "bot"), 260);
}
aiForm.addEventListener("submit", event => {
  event.preventDefault();
  sendGuidePrompt(aiInput.value);
});
document.querySelectorAll(".ai-prompts [data-prompt]").forEach(button => {
  button.addEventListener("click", () => sendGuidePrompt(button.dataset.prompt));
});
