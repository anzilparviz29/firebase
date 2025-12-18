import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

import firebaseConfig from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM elements
const authSection = document.getElementById('authSection');
const appSection = document.getElementById('appSection');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userInfo = document.getElementById('userInfo');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');

// Current user
let currentUser = null;

// Sign in with Google
signInBtn.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    currentUser = result.user;
    console.log('User signed in:', currentUser);
  } catch (error) {
    console.error('Sign-in error:', error);
    alert('Sign-in failed: ' + error.message);
  }
});

// Sign out
signOutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    currentUser = null;
    console.log('User signed out');
  } catch (error) {
    console.error('Sign-out error:', error);
  }
});

// Auth state observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    currentUser = user;
    authSection.style.display = 'none';
    appSection.style.display = 'block';
    
    // Update user info
    userAvatar.src = user.photoURL || 'https://via.placeholder.com/40';
    userName.textContent = user.displayName || 'User';
    userEmail.textContent = user.email;
    
    // Auto-load messages
    setTimeout(() => retrieveMessages(), 300);
  } else {
    // User is signed out
    currentUser = null;
    authSection.style.display = 'flex';
    appSection.style.display = 'none';
  }
});

// Export current user for use in app.js
export { currentUser, auth };
