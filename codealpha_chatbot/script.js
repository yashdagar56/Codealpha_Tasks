// DOM Elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const btnSend = document.getElementById("btn-send");
const btnClear = document.getElementById("btn-clear");
const typingIndicator = document.getElementById("typing-indicator");

// Equivalent of the Python get_bot_response logic
function getBotResponse(input) {
    const cleanedInput = input.trim().toLowerCase();

    // Remove punctuation for easier matching
    const noPunct = cleanedInput.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    // Rule-based logic (if-elif)
    if (noPunct === "hello" || noPunct === "hi" || noPunct === "hey") {
        return "Hi!";
    } else if (noPunct === "how are you") {
        return "I'm fine, thanks!";
    } else if (noPunct === "what is your name" || noPunct === "who are you") {
        return "I am Nexus AI, a simple rule-based chatbot designed for CodeAlpha Task 4!";
    } else if (noPunct === "tell me a joke") {
        return "Why do programmers prefer dark mode? Because light attracts bugs! 🐛";
    } else if (noPunct === "what can you do") {
        return "I can answer basic greetings like 'hello', 'how are you', or 'tell me a joke'. I'm a learning bot!";
    } else if (noPunct === "bye" || noPunct === "goodbye") {
        return "Goodbye! Have a great day!";
    } else {
        return "Sorry, I didn't understand that. I only know basic greetings right now.";
    }
}

// Function to safely inject HTML escaping to prevent XSS
function escapeHTML(str) {
    const div = document.createElement("div");
    div.innerText = str;
    return div.innerHTML;
}

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

// Append message to UI
function appendMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    
    div.innerHTML = `
        <div class="message-bubble">${escapeHTML(text)}</div>
        <div class="timestamp">Today ${getCurrentTime()} • ${sender === "user" ? "You" : "Nexus AI"}</div>
    `;
    
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle sending message
function handleSendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    // 1. Show user message
    userInput.value = "";
    appendMessage(text, "user");

    // 2. Show typing indicator
    typingIndicator.classList.remove("hide");
    chatBox.appendChild(typingIndicator); // Move indicator to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // 3. Simulate processing delay
    setTimeout(() => {
        typingIndicator.classList.add("hide");
        
        // Output Bot Reply
        const reply = getBotResponse(text);
        appendMessage(reply, "bot");
    }, 1000 + Math.random() * 1000); // 1-2 second realistic delay
}

// Event Listeners
btnSend.addEventListener("click", handleSendMessage);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSendMessage();
    }
});

btnClear.addEventListener("click", () => {
    chatBox.innerHTML = `
        <div class="message bot-message">
            <div class="message-bubble">
                Chat history cleared. How can I help you today?
            </div>
            <div class="timestamp">Just now • System</div>
        </div>
    `;
});
