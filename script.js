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
const ideaForm = document.getElementById("ideaForm");

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

const mailingModal = document.getElementById("mailingModal");
const closeMailingModal = document.getElementById("closeMailingModal");
const openMailingModalNav = document.getElementById("openMailingModalNav");
const openMailingModalHero = document.getElementById("openMailingModalHero");
const openMailingModal = document.getElementById("openMailingModal");

const ideaModal = document.getElementById("ideaModal");
const closeIdeaModal = document.getElementById("closeIdeaModal");
const openIdeaModalNav = document.getElementById("openIdeaModalNav");
const openIdeaModal = document.getElementById("openIdeaModal");

const openEventModal = document.getElementById("openEventModal");
const closeEventModal = document.getElementById("closeEventModal");
const eventModal = document.getElementById("eventModal");
const createEventForm = document.getElementById("createEventForm");
const eventsGrid = document.getElementById("eventsGrid");

function openModalElement(modal) {
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeModalElement(modal) {
  if (modal) {
    modal.classList.add("hidden");
  }
}

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

function openAuthModal(mode) {
  if (!authModal) return;
  authModal.classList.remove("hidden");
  setMode(mode);
}

function closeAuthModalFn() {
  if (!authModal) return;
  authModal.classList.add("hidden");

  if (signInMsg) signInMsg.textContent = "";
  if (signUpMsg) signUpMsg.textContent = "";
}

if (navSignIn) {
  navSignIn.addEventListener("click", () => openAuthModal("signin"));
}

if (navSignUp) {
  navSignUp.addEventListener("click", () => openAuthModal("signup"));
}

if (showSignIn) {
  showSignIn.addEventListener("click", () => setMode("signin"));
}

if (showSignUp) {
  showSignUp.addEventListener("click", () => setMode("signup"));
}

if (closeAuthModal) {
  closeAuthModal.addEventListener("click", closeAuthModalFn);
}

if (authModal) {
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) {
      closeAuthModalFn();
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

if (openMailingModalNav) {
  openMailingModalNav.addEventListener("click", () => {
    openModalElement(mailingModal);
  });
}

if (openMailingModalHero) {
  openMailingModalHero.addEventListener("click", () => {
    openModalElement(mailingModal);
  });
}

if (openMailingModal) {
  openMailingModal.addEventListener("click", () => {
    openModalElement(mailingModal);
  });
}

if (closeMailingModal) {
  closeMailingModal.addEventListener("click", () => {
    closeModalElement(mailingModal);
  });
}

if (mailingModal) {
  mailingModal.addEventListener("click", (e) => {
    if (e.target === mailingModal) {
      closeModalElement(mailingModal);
    }
  });
}

if (openIdeaModalNav) {
  openIdeaModalNav.addEventListener("click", () => {
    openModalElement(ideaModal);
  });
}

if (openIdeaModal) {
  openIdeaModal.addEventListener("click", () => {
    openModalElement(ideaModal);
  });
}

if (closeIdeaModal) {
  closeIdeaModal.addEventListener("click", () => {
    closeModalElement(ideaModal);
  });
}

if (ideaModal) {
  ideaModal.addEventListener("click", (e) => {
    if (e.target === ideaModal) {
      closeModalElement(ideaModal);
    }
  });
}

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

    setTimeout(() => {
      closeModalElement(mailingModal);
      if (msg) {
        msg.textContent = "";
      }
    }, 1200);
  });
}

if (ideaForm) {
  ideaForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = document.getElementById("idea-msg");

    if (msg) {
      msg.textContent =
        "✓ Thanks! Your idea has been submitted to the MBSA board.";
    }

    this.reset();

    setTimeout(() => {
      closeModalElement(ideaModal);
      if (msg) {
        msg.textContent = "";
      }
    }, 1200);
  });
}

function attachDeleteHandlers() {
  document.querySelectorAll(".delete-event-btn").forEach((button) => {
    if (!button.dataset.bound) {
      button.dataset.bound = "true";
      button.addEventListener("click", () => {
        const card = button.closest(".event-card");
        if (card) {
          card.remove();
        }
      });
    }
  });
}

if (openEventModal) {
  openEventModal.addEventListener("click", () => {
    openModalElement(eventModal);
  });
}

if (closeEventModal) {
  closeEventModal.addEventListener("click", () => {
    closeModalElement(eventModal);
  });
}

if (eventModal) {
  eventModal.addEventListener("click", (e) => {
    if (e.target === eventModal) {
      closeModalElement(eventModal);
    }
  });
}

if (createEventForm && eventsGrid) {
  createEventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const type = document.getElementById("eventType").value.trim();
    const title = document.getElementById("eventTitle").value.trim();
    const date = document.getElementById("eventDate").value.trim();
    const time = document.getElementById("eventTime").value.trim();
    const location = document.getElementById("eventLocation").value.trim();
    const description = document
      .getElementById("eventDescription")
      .value.trim();

    const newCard = document.createElement("article");
    newCard.className = "event-card";

    newCard.innerHTML = `
      <button class="delete-event-btn" aria-label="Delete event">&times;</button>
      <div class="event-tag">${type}</div>
      <h3>${title}</h3>
      <div class="event-meta">
        <span>&#128197; ${date}</span>
        <span>&#128336; ${time}</span>
        <span>&#128205; ${location}</span>
      </div>
      <p>${description}</p>
    `;

    eventsGrid.prepend(newCard);
    attachDeleteHandlers();
    closeModalElement(eventModal);
    this.reset();
  });
}

attachDeleteHandlers();
