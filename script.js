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
const navSignIn = document.getElementById("navSignIn");
const navSignUp = document.getElementById("navSignUp");
const closeAuthModal = document.getElementById("closeAuthModal");

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
  showSignIn.addEventListener("click", () => setAuthMode("signin"));
}

if (showSignUp) {
  showSignUp.addEventListener("click", () => setAuthMode("signup"));
}

if (closeAuthModal) {
  closeAuthModal.addEventListener("click", () => closeModal(authModal));
}

if (authModal) {
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) closeModal(authModal);
  });
}

// SIGN UP: creates Firebase Auth user + saves username/email in Firestore Users
if (signUpForm) {
  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("signUpUsername").value.trim();
    const email = document.getElementById("signUpEmail").value.trim();
    const password = document.getElementById("signUpPassword").value;

    signUpMsg.textContent = "Creating account...";

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "Users", user.uid), {
        username: username,
        email: email,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      signUpMsg.textContent = `Account created for ${username}!`;
      signUpForm.reset();
    } catch (error) {
      signUpMsg.textContent = error.message;
      console.error(error);
    }
  });
}

// SIGN IN
if (signInForm) {
  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signInEmail").value.trim();
    const password = document.getElementById("signInPassword").value;

    signInMsg.textContent = "Signing in...";

    try {
      await signInWithEmailAndPassword(auth, email, password);

      await addDoc(collection(db, "Users"), {
        email: email,
        action: "signed_in",
        signedInAt: serverTimestamp(),
      });

      signInMsg.textContent = `Signed in as ${email}`;
      signInForm.reset();
    } catch (error) {
      signInMsg.textContent = error.message;
      console.error(error);
    }
  });
}

// MAILING LIST
const mailingModal = document.getElementById("mailingModal");
const openMailingModalNav = document.getElementById("openMailingModalNav");
const openMailingModalHero = document.getElementById("openMailingModalHero");
const closeMailingModal = document.getElementById("closeMailingModal");
const signupForm = document.getElementById("signupForm");

if (openMailingModalNav) {
  openMailingModalNav.addEventListener("click", () => openModal(mailingModal));
}

if (openMailingModalHero) {
  openMailingModalHero.addEventListener("click", () => openModal(mailingModal));
}

if (closeMailingModal) {
  closeMailingModal.addEventListener("click", () => closeModal(mailingModal));
}

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const msg = document.getElementById("signup-msg");

    msg.textContent = "Submitting...";

    try {
      await addDoc(collection(db, "Email_Signups"), {
        name: name,
        email: email,
        createdAt: serverTimestamp(),
      });

      msg.textContent = "You joined the mailing list!";
      signupForm.reset();
    } catch (error) {
      msg.textContent = error.message;
      console.error(error);
    }
  });
}

// EVENT IDEA
const ideaModal = document.getElementById("ideaModal");
const openIdeaModalNav = document.getElementById("openIdeaModalNav");
const closeIdeaModal = document.getElementById("closeIdeaModal");
const ideaForm = document.getElementById("ideaForm");

if (openIdeaModalNav) {
  openIdeaModalNav.addEventListener("click", () => openModal(ideaModal));
}

if (closeIdeaModal) {
  closeIdeaModal.addEventListener("click", () => closeModal(ideaModal));
}

if (ideaForm) {
  ideaForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("ideaName").value.trim();
    const email = document.getElementById("ideaEmail").value.trim();
    const title = document.getElementById("ideaTitle").value.trim();
    const description = document.getElementById("ideaDesc").value.trim();
    const msg = document.getElementById("idea-msg");

    msg.textContent = "Submitting...";

    try {
      await addDoc(collection(db, "Idea_Submissions"), {
        name: name,
        email: email,
        title: title,
        description: description,
        createdAt: serverTimestamp(),
      });

      msg.textContent = "Event idea submitted!";
      ideaForm.reset();
    } catch (error) {
      msg.textContent = error.message;
      console.error(error);
    }
  });
}

// CREATE EVENT
const eventModal = document.getElementById("eventModal");
const openEventModal = document.getElementById("openEventModal");
const closeEventModal = document.getElementById("closeEventModal");
const createEventForm = document.getElementById("createEventForm");
const eventsGrid = document.getElementById("eventsGrid");

if (openEventModal) {
  openEventModal.addEventListener("click", () => openModal(eventModal));
}

if (closeEventModal) {
  closeEventModal.addEventListener("click", () => closeModal(eventModal));
}

if (createEventForm) {
  createEventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const type = document.getElementById("eventType").value.trim();
    const title = document.getElementById("eventTitle").value.trim();
    const date = document.getElementById("eventDate").value.trim();
    const time = document.getElementById("eventTime").value.trim();
    const location = document.getElementById("eventLocation").value.trim();
    const description = document
      .getElementById("eventDescription")
      .value.trim();

    try {
      await addDoc(collection(db, "Events"), {
        type: type,
        title: title,
        date: date,
        time: time,
        location: location,
        description: description,
        createdAt: serverTimestamp(),
      });

      const card = document.createElement("article");
      card.className = "event-card";
      card.innerHTML = `
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
      createEventForm.reset();
      closeModal(eventModal);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  });
}
