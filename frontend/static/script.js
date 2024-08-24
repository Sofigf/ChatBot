function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value;
    if (message.trim() === "") return;

    // Display user's message
    addMessage("user", message);

    // Send message to the Flask server
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        addMessage("bot", data.response);
    })
    .catch(error => {
        console.error('Error:', error);
        addMessage("bot", "Oops! Something went wrong.");
    });

    userInput.value = "";  // Clear input field
}

function addMessage(sender, message) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.className = sender;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}
