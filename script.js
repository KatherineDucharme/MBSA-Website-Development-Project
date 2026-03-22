// ═══════════════════════════════════════════════
// MBSA – script.js
// ═══════════════════════════════════════════════

// ── Mobile nav toggle ───────────────────────────
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close nav when a link is clicked (mobile)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// ── Mailing list form ────────────────────────────
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const msg = document.getElementById("signup-msg");

  // TODO: replace with a real form service (Formspree, EmailJS, etc.)
  msg.textContent = `Thanks, ${name}! We'll be in touch at ${email}.`;
  this.reset();
});

// ── Event idea form ──────────────────────────────
document.getElementById("ideaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const msg = document.getElementById("idea-msg");

  // TODO: replace with a real form service
  msg.textContent = "✓ Thanks! Your idea has been submitted to the MBSA board.";
  this.reset();
});
