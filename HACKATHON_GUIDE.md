# Firebase Authentication with Google Sign-In - Setup Guide

This demo teaches how to integrate Firebase Authentication with Google Sign-in into a Flask + Firestore application.

## 🎯 What You'll Learn at the Hackathon

1. **Firebase Authentication** - User authentication with Google
2. **Firestore Database** - Real-time data storage
3. **Flask Backend** - Python web framework
4. **Modern UI** - Apple-inspired design

## 📋 Prerequisites

- Firebase Project created at [console.firebase.google.com](https://console.firebase.google.com)
- Python 3.7+ installed
- Google account for testing

## 🔧 Setup Instructions

### 1. Firebase Console Setup

#### A. Enable Google Sign-In
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google** and enable it
5. Add a support email
6. Click **Save**

#### B. Get Firebase Web Config
1. Go to **Project Settings** (gear icon)
2. Scroll to **Your apps** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a name (e.g., "Firestore Messages")
5. Copy the `firebaseConfig` object

#### C. Enable Firestore
1. Go to **Firestore Database**
2. Click **Create database**
3. Start in **test mode** for now
4. Choose a location
5. Click **Enable**

#### D. Get Service Account Key
1. Go to **Project Settings** → **Service accounts**
2. Click **Generate new private key**
3. Download the JSON file
4. Rename it to `serviceAccountKey.json`
5. Place it in your project root folder

### 2. Configure the Application

#### Update `static/firebase-config.js`

Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

#### Update `.env` file

Ensure your service account path is correct:

```
FIREBASE_SERVICE_ACCOUNT=serviceAccountKey.json
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

Required packages:
- Flask
- firebase-admin
- python-dotenv

### 4. Run the Application

```bash
python app.py
```

Visit: `http://localhost:5000`

## 🎓 Teaching Points for Hackathon

### 1. **Firebase Authentication Flow**
```
User clicks "Sign in with Google"
    ↓
Firebase SDK opens Google Sign-in popup
    ↓
User selects Google account
    ↓
Firebase returns user object with profile data
    ↓
App shows authenticated UI
```

### 2. **Key Code Sections to Explain**

#### `static/auth.js` - Authentication Logic
- `initializeApp()` - Initialize Firebase
- `signInWithPopup()` - Google Sign-in
- `onAuthStateChanged()` - Listen for auth state
- `signOut()` - Sign out user

#### `static/app.js` - Using Auth Data
- Access `currentUser` object
- Use `displayName` and `email`
- Auto-populate user info in messages

#### `templates/index.html` - UI States
- Auth section (visible when logged out)
- App section (visible when logged in)
- User header with avatar

### 3. **Security Best Practices**

- Never commit `serviceAccountKey.json` to Git
- Add to `.gitignore`
- Use environment variables for sensitive data
- In production, use Firestore security rules

### 4. **Firestore Security Rules**

For production, add rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{message} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 Features Demonstrated

✅ Google Authentication with popup  
✅ User profile display (name, email, avatar)  
✅ Protected routes (auth required)  
✅ Auto-populate user data in forms  
✅ Sign out functionality  
✅ Real-time Firestore operations  
✅ Modern Apple-inspired UI  
✅ Dark mode support  

## 📱 Testing the App

1. Click "Sign in with Google"
2. Select your Google account
3. See your profile appear in the header
4. Send a message (name auto-filled)
5. View messages in real-time
6. Click "Sign Out" to test logout

## 🎨 UI Features

- **Authentication Screen** - Clean Google Sign-in button
- **User Header** - Shows avatar, name, email
- **Responsive Design** - Works on mobile and desktop
- **Dark Mode** - Auto-adapts to system preference
- **Smooth Animations** - Professional feel

## 🔍 Troubleshooting

**"Sign-in failed" error:**
- Check Firebase config values
- Ensure Google Sign-in is enabled
- Check browser console for details

**"Failed to send message" error:**
- Verify `serviceAccountKey.json` exists
- Check Firestore is enabled
- Verify Flask app is running

**UI not loading:**
- Clear browser cache
- Check browser console for errors
- Verify static files are loading

## 📚 Additional Resources

- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Flask Documentation](https://flask.palletsprojects.com/)

## 🎤 Demo Script for Presentation

1. **Introduction** (2 min)
   - Show final app
   - Explain Firebase + Flask combo

2. **Firebase Console** (5 min)
   - Show project setup
   - Enable Authentication
   - Show Firestore data

3. **Code Walkthrough** (8 min)
   - Firebase config
   - Auth flow (`auth.js`)
   - Firestore operations
   - UI integration

4. **Live Demo** (3 min)
   - Sign in
   - Send messages
   - Show real-time updates
   - Sign out

5. **Q&A** (2 min)

Total: ~20 minutes

Good luck with your hackathon presentation! 🎉
