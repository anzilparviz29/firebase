) Firebase Setup (Service Account JSON for Flask)
Download service account key

Firebase Console → Project settings → Service accounts →
✅ Generate new private key → download JSON

Place it in the repo root

Rename it (recommended):

serviceAccountKey.json


Put it in the same folder as app.py.

2) Create .env (repo root)

Create a file named .env in the repo root:

FIREBASE_SERVICE_ACCOUNT=serviceAccountKey.json


⚠️ Never commit .env or serviceAccountKey.json.

3) Python Setup (Virtual Environment)
Create venv (choose one)

Option A (recommended):

python -m venv .venv


Option B (if you already use venv/):

python -m venv venv

Activate venv

macOS / Linux

source .venv/bin/activate


Windows (PowerShell)

.venv\Scripts\Activate.ps1


Windows (CMD)

.venv\Scripts\activate

Install Python requirements
pip install -r requirements.txt

4) Frontend Setup (npm)

From the repo root:

npm install
npm install firebase

5) Add Firebase Web App Config (Frontend)
Create static/firebaseConfig.js

Firebase Console → Project settings → Your apps → Web app → config snippet
Copy values and paste here:

// static/firebaseConfig.js
export const firebaseConfig = {
  apiKey: "PASTE",
  authDomain: "PASTE",
  projectId: "PASTE",
  storageBucket: "PASTE",
  messagingSenderId: "PASTE",
  appId: "PASTE",
};


This is client config (safe to be in frontend).
The serviceAccountKey.json is the secret (server only).

6) Run the App

Start Flask (from repo root):

python app.py


Open:

http://localhost:5000