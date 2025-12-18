const form = document.getElementById("form");
const nameEl = document.getElementById("name");
const textEl = document.getElementById("text");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameEl.value.trim();
  const text = textEl.value.trim();

  statusEl.textContent = "Sending…";

  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Failed");

    textEl.value = "";
    statusEl.textContent = `Sent ✅ docId=${data.id}`;
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Error: " + (err.message || "Failed");
  }
});
