Firebase + Flask Workshop Setup

This repo contains a Flask (Python) backend and a web frontend that connects to Firebase / Firestore.

Prerequisites

Python 3.10+ (or 3.9+)

Node.js (LTS)

A Firebase project (Firestore enabled)

Backend Setup (Python / Flask)
1) Create virtual environment
cd backend
python -m venv venv

2) Activate virtual environment

macOS / Linux

source venv/bin/activate


Windows (PowerShell)

venv\Scripts\Activate.ps1


Windows (CMD)

venv\Scripts\activate

3) Install Python requirements
pip install -r requirements.txt

Firebase Setup (Service Account JSON for backend)
4) Download service account key

Firebase Console → Project settings

Service accounts

Click Generate new private key → download JSON

5) Place the JSON file in the backend folder

Rename it (recommended): serviceAccountKey.json

Put it inside:

flask-firestore-demo/

6) Add .env file for backend

Create .env and add:

FIREBASE_SERVICE_ACCOUNT=serviceAccountKey.json


Don’t commit the JSON or .env to Git.

Frontend Setup (Node / npm)
7) Install frontend dependencies
cd frontend
npm install
npm install firebase

8) Add Firebase web config file

Create/update your config file (example name):

flask-firestore-demo/static/firebaseConfig.js


Paste the Firebase Web App config from:
Firebase Console → Project settings → Your apps → Web app → config snippet.

Run the Project
9) Start backend

python app.py

