import { currentUser } from './auth.js';

const form = document.getElementById("form");
const nameEl = document.getElementById("name");
const textEl = document.getElementById("text");
const statusEl = document.getElementById("status");

const btnRetrieve = document.getElementById("btnRetrieve");
const listEl = document.getElementById("list");

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showStatus(message, type = "loading") {
  statusEl.textContent = message;
  statusEl.className = `show ${type}`;
  
  if (type === "success" || type === "error") {
    setTimeout(() => {
      statusEl.className = "";
    }, 5000);
  }
}

// SEND (POST)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = textEl.value.trim();

  // Use authenticated user's name
  const name = currentUser?.displayName || "Anonymous";

  showStatus("Sending message...", "loading");

  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Failed");

    textEl.value = "";
    showStatus(`Message sent successfully!`, "success");
    
    // Auto-refresh messages after sending
    setTimeout(() => retrieveMessages(), 500);
  } catch (err) {
    console.error(err);
    showStatus("Error: " + (err.message || "Failed to send message"), "error");
  }
});

// RETRIEVE (GET)
async function retrieveMessages() {
  const previousText = statusEl.textContent;
  showStatus("Loading messages...", "loading");

  try {
    const res = await fetch("/api/messages");
    const data = await res.json().catch(() => []);

    if (!res.ok) {
      throw new Error("Failed to retrieve messages");
    }

    listEl.innerHTML = "";

    if (data.length === 0) {
      listEl.innerHTML = '<li style="text-align: center; color: var(--text-secondary);">No messages yet. Be the first to send one!</li>';
    } else {
      data.forEach((m) => {
        const li = document.createElement("li");
        
        const when = m.createdAt ? new Date(m.createdAt).toLocaleString() : "—";
        li.innerHTML = `
          <div class="message-author">${escapeHtml(m.name || "Anonymous")}</div>
          <div class="message-text">${escapeHtml(m.text || "")}</div>
          <div class="message-time">${escapeHtml(when)}</div>
        `;
        listEl.appendChild(li);
      });
    }

    showStatus(`Loaded ${data.length} message${data.length !== 1 ? 's' : ''}`, "success");
  } catch (err) {
    console.error(err);
    showStatus("Error: Failed to load messages", "error");
  }
}

btnRetrieve.addEventListener("click", retrieveMessages);

// Auto-load messages on page load
window.addEventListener("DOMContentLoaded", () => {
  retrieveMessages();
});
