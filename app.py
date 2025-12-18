from flask import Flask, render_template, request, jsonify
from google.cloud.firestore_v1 import SERVER_TIMESTAMP

from firebase_admin_init import get_db

app = Flask(__name__)
db = get_db()

COLL = "messages"

def serialize_doc(doc):
    data = doc.to_dict() or {}
    created = data.get("createdAt")

    # Firestore timestamp becomes a Python datetime (when available)
    if created is not None and hasattr(created, "isoformat"):
        data["createdAt"] = created.isoformat()
    else:
        data["createdAt"] = None

    data["id"] = doc.id
    return data


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


# ✅ NEW: Retrieve messages
@app.get("/api/messages")
def list_messages():
    docs = (
        db.collection(COLL)
        .order_by("createdAt", direction="DESCENDING")
        .limit(50)
        .stream()
    )
    items = [serialize_doc(d) for d in docs]
    return jsonify(items)


if __name__ == "__main__":
    # Run on all interfaces, accessible via localhost or 127.0.0.1
    app.run(debug=True, host='0.0.0.0', port=5000)
