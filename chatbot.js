document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("chatbot-root");
  const endpoint = root.dataset.endpoint || "";

  // Create chat button
  const chatBtn = document.createElement("button");
  chatBtn.id = "chatbot-button";
  chatBtn.innerHTML = "💬";
  document.body.appendChild(chatBtn);

  // Create chat box
  const chatBox = document.createElement("div");
  chatBox.id = "chatbot-box";
  chatBox.innerHTML = `
    <div id="chatbot-header">Chat with us</div>
    <div id="chatbot-messages"></div>
    <div id="chatbot-input-area">
      <input type="text" id="chatbot-input" placeholder="Type a message..." />
      <button id="chatbot-send">Send</button>
    </div>
  `;
  document.body.appendChild(chatBox);

  const messages = chatBox.querySelector("#chatbot-messages");
  const input = chatBox.querySelector("#chatbot-input");
  const sendBtn = chatBox.querySelector("#chatbot-send");

  chatBtn.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
  });

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.textContent = `${sender}: ${text}`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    addMessage("You", text);
    input.value = "";

    // Mock bot reply
    setTimeout(() => {
      addMessage("Bot", "Thanks for your message! We'll reply soon.");
    }, 800);

    // Send data to backend if endpoint exists
    if (endpoint) {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, timestamp: new Date().toISOString() }),
      }).catch((err) => console.error("Error:", err));
    }
  });
});