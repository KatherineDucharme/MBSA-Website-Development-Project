import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfUHAYfHAsMKPAhI266yjBp01ztCswmks",
  authDomain: "mbsa-website-group3.firebaseapp.com",
  projectId: "mbsa-website-group3",
  storageBucket: "mbsa-website-group3.firebasestorage.app",
  messagingSenderId: "341802031078",
  appId: "1:341802031078:web:7afca60a790e67db13e827",
  measurementId: "G-F9M49SK9JB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

function openModal(modal) {
  if (modal) modal.classList.remove("hidden");
}

function closeModal(modal) {
  if (modal) modal.classList.add("hidden");
}

const authModal = document.getElementById("authModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const navSignIn = document.getElementById("navSignIn");
const navSignUp = document.getElementById("navSignUp");
const navLogout = document.getElementById("navLogout");

const protectedContent = document.querySelectorAll(".protected-content");
const adminOnlyElements = document.querySelectorAll(".admin-only");

let isSignedIn = false;
let isAdmin = false;

const adminEmails = [
  "hkaczor@wisc.edu",
  "kaducharme@wisc.edu",
  "sstafeil@wisc.edu",
  "wbah@wisc.edu",
  "echansen2@wisc.edu",
];

function updatePageVisibility() {
  document.querySelectorAll(".protected-content").forEach((element) => {
    if (isSignedIn) {
      element.classList.remove("hidden");
      element.style.removeProperty("display");
    } else {
      element.classList.add("hidden");
    }
  });

  document.querySelectorAll(".admin-only").forEach((element) => {
    if (isSignedIn && isAdmin) {
      element.classList.remove("hidden");
      element.style.removeProperty("display");
    } else {
      element.classList.add("hidden");
    }
  });

  if (navSignIn) navSignIn.classList.toggle("hidden", isSignedIn);
  if (navSignUp) navSignUp.classList.toggle("hidden", isSignedIn);
  if (navLogout) navLogout.classList.toggle("hidden", !isSignedIn);
}

function signInUser(email) {
  console.log("SIGNED IN USER:", email);

  isSignedIn = true;
  isAdmin = adminEmails.includes(email.toLowerCase());

  console.log("isSignedIn:", isSignedIn);
  console.log("isAdmin:", isAdmin);
  console.log(
    "protectedContent count:",
    document.querySelectorAll(".protected-content").length,
  );

  updatePageVisibility();
  closeModal(authModal);
}

const showSignIn = document.getElementById("showSignIn");
const showSignUp = document.getElementById("showSignUp");

const signInPanel = document.getElementById("signInPanel");
const signUpPanel = document.getElementById("signUpPanel");

const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");

const signInMsg = document.getElementById("signInMsg");
const signUpMsg = document.getElementById("signUpMsg");

function setAuthMode(mode) {
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

onAuthStateChanged(auth, (user) => {
  if (user) {
    signInUser(user.email);
  } else {
    isSignedIn = false;
    isAdmin = false;
    updatePageVisibility();
  }
});

if (navLogout) {
  navLogout.addEventListener("click", async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  });
}

if (navSignIn) {
  navSignIn.addEventListener("click", () => {
    openModal(authModal);
    setAuthMode("signin");
  });
}

if (navSignUp) {
  navSignUp.addEventListener("click", () => {
    openModal(authModal);
    setAuthMode("signup");
  });
}

if (showSignIn) {
  showSignIn.addEventListener("click", () => {
    setAuthMode("signin");
  });
}

if (showSignUp) {
  showSignUp.addEventListener("click", () => {
    setAuthMode("signup");
  });
}

if (closeAuthModal) {
  closeAuthModal.addEventListener("click", () => {
    closeModal(authModal);
  });
}

if (authModal) {
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) {
      closeModal(authModal);
    }
  });
}

if (signUpForm) {
  signUpForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("signUpEmail").value.trim();
    const password = document.getElementById("signUpPassword").value.trim();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      signInUser(userCredential.user.email);
      this.reset();
    } catch (error) {
      signUpMsg.textContent = error.message;
      console.error(error);
    }
  });
}

if (signInForm) {
  signInForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("signInEmail").value.trim();
    const password = document.getElementById("signInPassword").value.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      signInUser(userCredential.user.email);
      this.reset();
    } catch (error) {
      signInMsg.textContent = error.message;
      console.error(error);
    }
  });
}

const mailingModal = document.getElementById("mailingModal");
const openMailingModalNav = document.getElementById("openMailingModalNav");
const openMailingModalHero = document.getElementById("openMailingModalHero");
const closeMailingModal = document.getElementById("closeMailingModal");
const signupForm = document.getElementById("signupForm");
const signupMsg = document.getElementById("signup-msg");

if (openMailingModalNav) {
  openMailingModalNav.addEventListener("click", () => {
    openModal(mailingModal);
  });
}

if (openMailingModalHero) {
  openMailingModalHero.addEventListener("click", () => {
    openModal(mailingModal);
  });
}

if (closeMailingModal) {
  closeMailingModal.addEventListener("click", () => {
    closeModal(mailingModal);
  });
}

if (mailingModal) {
  mailingModal.addEventListener("click", (e) => {
    if (e.target === mailingModal) {
      closeModal(mailingModal);
    }
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();

    signupMsg.textContent = "Submitting...";

    try {
      await addDoc(collection(db, "Email_Signups"), {
        name: name,
        email: email,
        createdAt: serverTimestamp(),
      });

      signupMsg.textContent = "You joined the mailing list!";
      signupForm.reset();
    } catch (error) {
      signupMsg.textContent = error.message;
      console.error(error);
    }
  });
}

const ideaModal = document.getElementById("ideaModal");
const openIdeaModalNav = document.getElementById("openIdeaModalNav");
const closeIdeaModal = document.getElementById("closeIdeaModal");
const ideaForm = document.getElementById("ideaForm");
const ideaMsg = document.getElementById("idea-msg");

if (openIdeaModalNav) {
  openIdeaModalNav.addEventListener("click", () => {
    openModal(ideaModal);
  });
}

if (closeIdeaModal) {
  closeIdeaModal.addEventListener("click", () => {
    closeModal(ideaModal);
  });
}

if (ideaModal) {
  ideaModal.addEventListener("click", (e) => {
    if (e.target === ideaModal) {
      closeModal(ideaModal);
    }
  });
}

if (ideaForm) {
  ideaForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("ideaName").value.trim();
    const email = document.getElementById("ideaEmail").value.trim();
    const title = document.getElementById("ideaTitle").value.trim();
    const description = document.getElementById("ideaDesc").value.trim();

    ideaMsg.textContent = "Submitting...";

    try {
      await addDoc(collection(db, "Idea_Submissions"), {
        name: name,
        email: email,
        title: title,
        description: description,
        createdAt: serverTimestamp(),
      });

      ideaMsg.textContent = "Event idea submitted!";
      ideaForm.reset();
    } catch (error) {
      ideaMsg.textContent = error.message;
      console.error(error);
    }
  });
}

const eventModal = document.getElementById("eventModal");
const openEventModal = document.getElementById("openEventModal");
const closeEventModal = document.getElementById("closeEventModal");
const createEventForm = document.getElementById("createEventForm");
const eventsGrid = document.getElementById("eventsGrid");
const eventMsg = document.getElementById("event-msg");

if (openEventModal) {
  openEventModal.addEventListener("click", () => {
    if (!isAdmin) return;
    openModal(eventModal);
  });
}

if (closeEventModal) {
  closeEventModal.addEventListener("click", () => {
    closeModal(eventModal);
  });
}

if (eventModal) {
  eventModal.addEventListener("click", (e) => {
    if (e.target === eventModal) {
      closeModal(eventModal);
    }
  });
}

if (createEventForm) {
  createEventForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!isAdmin) return;

    const type = document.getElementById("eventType").value.trim();
    const title = document.getElementById("eventTitle").value.trim();
    const date = document.getElementById("eventDate").value.trim();
    const time = document.getElementById("eventTime").value.trim();
    const location = document.getElementById("eventLocation").value.trim();
    const description = document
      .getElementById("eventDescription")
      .value.trim();

    eventMsg.textContent = "Adding event...";

    try {
      await addDoc(collection(db, "Events"), {
        type,
        title,
        date,
        time,
        location,
        description,
        createdAt: serverTimestamp(),
      });

      const card = document.createElement("article");
      card.className = "event-card";

      card.innerHTML = `
        <button class="delete-event-btn admin-only" aria-label="Delete event">&times;</button>
        <div class="event-tag">${type}</div>
        <h3>${title}</h3>
        <div class="event-meta">
          <span>&#128197; ${date}</span>
          <span>&#128336; ${time}</span>
          <span>&#128205; ${location}</span>
        </div>
        <p>${description}</p>
      `;

      eventsGrid.prepend(card);
      updatePageVisibility();

      eventMsg.textContent = "Event added!";
      createEventForm.reset();

      setTimeout(() => {
        closeModal(eventModal);
        eventMsg.textContent = "";
      }, 1000);
    } catch (error) {
      eventMsg.textContent = error.message;
      console.error(error);
    }
  });
}

if (eventsGrid) {
  eventsGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-event-btn")) {
      if (!isAdmin) return;
      e.target.closest(".event-card").remove();
    }
  });
}

updatePageVisibility();
