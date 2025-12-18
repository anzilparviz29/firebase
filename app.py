from flask import Flask, render_template, request, jsonify
from google.cloud.firestore_v1 import SERVER_TIMESTAMP

from firebase_admin_init import get_db

app = Flask(__name__)
db = get_db()

COLL = "messages"

@app.get("/")
def home():
    return render_template("index.html")

@app.post("/api/messages")
def create_message():
    data = request.get_json(force=True, silent=True) or {}
    name = (data.get("name") or "").strip()
    text = (data.get("text") or "").strip()

    if not name:
        return jsonify({"error": "name is required"}), 400
    if not text:
        return jsonify({"error": "text is required"}), 400
    if len(text) > 280:
        return jsonify({"error": "max 280 chars"}), 400

    doc_ref = db.collection(COLL).document()
    doc_ref.set({
        "name": name,
        "text": text,
        "createdAt": SERVER_TIMESTAMP,
    })

    return jsonify({"ok": True, "id": doc_ref.id})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
