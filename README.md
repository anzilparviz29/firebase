# 🔥 Firebase + Flask Firestore Demo

Workshop project demonstrating **Firebase Authentication**, **Firestore Database**, and **Flask Backend** with a modern Apple-inspired UI.

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

---

## 🎯 Features

- ✅ **Google Authentication** - Sign in with Google account
- ✅ **Real-time Messaging** - Send and receive messages instantly
- ✅ **Firestore Integration** - Cloud database for message storage
- ✅ **Modern UI** - Apple-inspired design with dark mode support
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Flask Backend** - Python web server handling API requests

---

## 📋 Prerequisites

- Python 3.7 or higher
- Firebase project ([Create one here](https://console.firebase.google.com))
- Google account for testing

---

## 🚀 Quick Start

### 1️⃣ Firebase Setup (Service Account)

#### Download Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Project Settings** → **Service Accounts**
4. Click **Generate new private key** → Download JSON file
5. Rename the file to `serviceAccountKey.json`
6. Place it in the **project root** (same folder as `app.py`)

```
flask-firestore-demo/
├── serviceAccountKey.json  ← Place here
├── app.py
└── ...
```

#### Create Environment File

Create a `.env` file in the project root:

```env
FIREBASE_SERVICE_ACCOUNT=serviceAccountKey.json
```

⚠️ **Important:** Never commit `.env` or `serviceAccountKey.json` to Git!

---

### 2️⃣ Enable Firebase Authentication

1. Go to **Firebase Console** → **Authentication**
2. Click **Get Started**
3. Go to **Sign-in method** tab
4. Enable **Google** provider
5. Add a support email
6. Click **Save**

---

### 3️⃣ Enable Firestore Database

1. Go to **Firebase Console** → **Firestore Database**
2. Click **Create database**
3. Start in **Test mode** (for development)
4. Choose a location (closest to you)
5. Click **Enable**

---

### 4️⃣ Get Firebase Web App Config

1. Go to **Firebase Console** → **Project Settings**
2. Scroll to **Your apps** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register app with a nickname (e.g., "Firestore Messages")
5. Copy the `firebaseConfig` object
6. Create/Update `static/firebase-config.js`:

```javascript
// static/firebase-config.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export default firebaseConfig;
```

✅ **Note:** Client config is safe to expose publicly  
⚠️ **Never expose:** `serviceAccountKey.json` (server-side only)

---

### 5️⃣ Python Setup (Virtual Environment)

#### Create Virtual Environment

**Option A (Recommended):**
```bash
python -m venv .venv
```

**Option B:**
```bash
python -m venv venv
```

#### Activate Virtual Environment

**macOS / Linux:**
```bash
source .venv/bin/activate
```

**Windows (PowerShell):**
```powershell
.venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
.venv\Scripts\activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

**Required packages:**
- Flask
- firebase-admin
- python-dotenv

---

### 6️⃣ Run the Application

Start the Flask server:

```bash
python app.py
```

Open your browser and visit:
```
http://localhost:5000
```

---

## 🎓 Usage

1. Click **"Sign in with Google"**
2. Select your Google account
3. See your profile (name, email, avatar) in the header
4. Type a message and click **"Send Message"**
5. View messages in real-time
6. Click **"Sign Out"** when done

---

## 📁 Project Structure

```
flask-firestore-demo/
├── app.py                      # Flask backend server
├── firebase_admin_init.py      # Firebase Admin SDK initialization
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables (secret)
├── .gitignore                  # Git ignore file
├── serviceAccountKey.json      # Firebase service account (secret)
├── templates/
│   └── index.html             # Main HTML template
└── static/
    ├── styles.css             # Apple-inspired CSS styles
    ├── app.js                 # Main application logic
    ├── auth.js                # Firebase authentication logic
    └── firebase-config.js     # Firebase web config
```

---

## 🔒 Security Best Practices

### For Development
- Keep `serviceAccountKey.json` private
- Never commit `.env` or service account keys
- Use test mode for Firestore during development

### For Production
Add Firestore security rules:

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

---

## 🎨 UI Features

- **Modern Design** - Apple-inspired interface
- **Dark Mode** - Automatic based on system preference
- **Smooth Animations** - Professional transitions
- **Responsive Layout** - Mobile and desktop friendly
- **Glassmorphism** - Modern backdrop blur effects
- **Color-coded Status** - Success, error, and loading states

---

## 🐛 Troubleshooting

### "Sign-in failed: auth/unauthorized-domain"
- Add your domain to Firebase Console → Authentication → Settings → Authorized domains
- For local dev, add `localhost` and `127.0.0.1`

### "Failed to send message"
- Check that `serviceAccountKey.json` exists in project root
- Verify Firestore is enabled
- Ensure Flask server is running

### Messages not loading
- Check browser console for errors
- Verify Firebase config in `firebase-config.js`
- Ensure you're signed in

---

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Flask Documentation](https://flask.palletsprojects.com/)

---

## 📝 License

This project is open source and available for educational purposes.

---

## 🙋 Support

For hackathon questions or issues, refer to `HACKATHON_GUIDE.md` for detailed teaching materials and troubleshooting steps.

---

**Made with ❤️ for Google Developer Groups - SCEM Hackathon**  
**Date:** December 18, 2025  
**Speaker:** Mohammad Anzil Parveez - AI Developer @ Kyndryl