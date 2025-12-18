# Firebase + Flask Firestore Demo

Workshop project to **push data to Firestore** and **retrieve it in the UI** using **Flask (Python)** + a simple frontend (`templates/` + `static/`).

---

## ✅ Firebase Setup (Service Account JSON for Flask)

### 1) Download service account key
Firebase Console → **Project settings** → **Service accounts** →  
✅ **Generate new private key** → download JSON

### 2) Place it in the repo root
- Rename it (recommended): `serviceAccountKey.json`
- Put it in the **same folder as `app.py`**

```txt
./serviceAccountKey.json
✅ Create .env (repo root)
Create a file named .env in the repo root:

env
Copy code
FIREBASE_SERVICE_ACCOUNT=serviceAccountKey.json
⚠️ Never commit .env or serviceAccountKey.json.

✅ Python Setup (Virtual Environment)
1) Create venv (choose one)
Option A (recommended):

bash
Copy code
python -m venv .venv
Option B (if you already use venv/):

bash
Copy code
python -m venv venv
2) Activate venv
macOS / Linux

bash
Copy code
source .venv/bin/activate
Windows (PowerShell)

powershell
Copy code
.venv\Scripts\Activate.ps1
Windows (CMD)

bat
Copy code
.venv\Scripts\activate
3) Install Python requirements
bash
Copy code
pip install -r requirements.txt
✅ Frontend Setup (npm)
From the repo root:

bash
Copy code
npm install
npm install firebase
✅ Firebase Web App Config (Frontend)
Create static/firebaseConfig.js
Firebase Console → Project settings → Your apps → Web app → config snippet
Copy values and paste here:

js
Copy code
// static/firebaseConfig.js
export const firebaseConfig = {
  apiKey: "PASTE",
  authDomain: "PASTE",
  projectId: "PASTE",
  storageBucket: "PASTE",
  messagingSenderId: "PASTE",
  appId: "PASTE",
};
✅ Client config is safe to expose.
⚠️ serviceAccountKey.json is server secret (keep private).

▶️ Run the App
Start Flask (from repo root):

bash
Copy code
python app.py
Open in browser:

http://localhost:5000