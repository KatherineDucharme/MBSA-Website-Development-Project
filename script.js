const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const msg = document.getElementById("signup-msg");

    if (msg) {
      msg.textContent = `Thanks, ${name}! We'll be in touch at ${email}.`;
    }

    this.reset();
  });
}

const ideaForm = document.getElementById("ideaForm");
if (ideaForm) {
  ideaForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = document.getElementById("idea-msg");

    if (msg) {
      msg.textContent =
        "✓ Thanks! Your idea has been submitted to the MBSA board.";
    }

    this.reset();
  });
}

const authModal = document.getElementById("authModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const navSignIn = document.getElementById("navSignIn");
const navSignUp = document.getElementById("navSignUp");
const showSignIn = document.getElementById("showSignIn");
const showSignUp = document.getElementById("showSignUp");
const signInPanel = document.getElementById("signInPanel");
const signUpPanel = document.getElementById("signUpPanel");
const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");
const signInMsg = document.getElementById("signInMsg");
const signUpMsg = document.getElementById("signUpMsg");

function setMode(mode) {
  if (!signInPanel || !signUpPanel || !showSignIn || !showSignUp) return;

  if (mode === "signup") {
    signUpPanel.classList.remove("hidden");
    signInPanel.classList.add("hidden");
    showSignUp.classList.add("active");
    showSignIn.classList.remove("active");
  } else {
    signInPanel.classList.remove("hidden");
    signUpPanel.classList.add("hidden");
    showSignIn.classList.add("active");
    showSignUp.classList.remove("active");
  }
}

function openModal(mode) {
  if (!authModal) return;
  authModal.classList.remove("hidden");
  setMode(mode);
}

function closeModal() {
  if (!authModal) return;
  authModal.classList.add("hidden");

  if (signInMsg) {
    signInMsg.textContent = "";
  }

  if (signUpMsg) {
    signUpMsg.textContent = "";
  }
}

if (navSignIn) {
  navSignIn.addEventListener("click", () => openModal("signin"));
}

if (navSignUp) {
  navSignUp.addEventListener("click", () => openModal("signup"));
}

if (showSignIn) {
  showSignIn.addEventListener("click", () => setMode("signin"));
}

if (showSignUp) {
  showSignUp.addEventListener("click", () => setMode("signup"));
}

if (closeAuthModal) {
  closeAuthModal.addEventListener("click", closeModal);
}

if (authModal) {
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) {
      closeModal();
    }
  });
}

if (signInForm) {
  signInForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("signInEmail").value.trim();

    if (signInMsg) {
      signInMsg.textContent = `Signed in as ${email}.`;
    }

    this.reset();
  });
}

if (signUpForm) {
  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("signUpName").value.trim();

    if (signUpMsg) {
      signUpMsg.textContent = `Thanks, ${name}! Your account has been created.`;
    }

    this.reset();
  });
}
