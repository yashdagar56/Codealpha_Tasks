const WORDS = ["python", "hangman", "coding", "keyboard", "monitor"];
const MAX_MISTAKES = 6;

let currentWord = "";
let guessedLetters = new Set();
let failures = 0;
let isGameOver = false;

// DOM Elements
const wrapper = document.getElementById("game-wrapper");
const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const hangmanParts = document.querySelectorAll(".hangman-part");
const healthBar = document.getElementById("health-bar");
const attemptsText = document.getElementById("attempts-text");

// Modal Elements
const gameModal = document.getElementById("game-modal");
const modalBox = gameModal.querySelector(".modal-box");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const modalWord = document.getElementById("modal-word");
const btnRestart = document.getElementById("btn-restart");

function initGame() {
    currentWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    guessedLetters.clear();
    failures = 0;
    isGameOver = false;

    // Hide Modal
    gameModal.classList.add("hide");
    modalBox.classList.remove("win", "lose");
    
    // Reset Hangman
    hangmanParts.forEach(part => part.classList.add("hide"));
    
    // Reset UI Counters
    updateStatusPanel();

    // Render components
    renderWord();
    renderKeyboard();
}

function updateStatusPanel() {
    const attemptsLeft = MAX_MISTAKES - failures;
    const healthPercent = (attemptsLeft / MAX_MISTAKES) * 100;
    
    // A glitch effect for the text
    attemptsText.innerText = `${healthPercent.toFixed(0)}%`;
    healthBar.style.width = `${healthPercent}%`;
    
    if (healthPercent <= 35) {
        healthBar.classList.add("warning");
        attemptsText.style.color = "var(--neon-red)";
        attemptsText.style.textShadow = "0 0 10px var(--neon-red-glow)";
    } else {
        healthBar.classList.remove("warning");
        attemptsText.style.color = "var(--neon-teal)";
        attemptsText.style.textShadow = "0 0 10px var(--neon-teal-glow)";
    }
}

function renderWord() {
    wordDisplay.innerHTML = "";
    currentWord.split("").forEach((letter, index) => {
        const span = document.createElement("span");
        span.classList.add("letter-box");
        span.id = `letterbox-${index}`;
        
        if (guessedLetters.has(letter)) {
            span.innerText = letter;
            span.classList.add("revealed");
        }
        wordDisplay.appendChild(span);
    });
}

function renderKeyboard() {
    keyboard.innerHTML = "";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let char of letters) {
        const button = document.createElement("button");
        button.innerText = char;
        button.classList.add("key");
        button.id = `key-${char}`;
        button.addEventListener("click", () => handleGuess(char));
        keyboard.appendChild(button);
    }
}

function handleGuess(letter) {
    if (isGameOver || guessedLetters.has(letter)) return;

    guessedLetters.add(letter);
    const keyBtn = document.getElementById(`key-${letter}`);
    
    if (currentWord.includes(letter)) {
        // Success
        keyBtn.classList.add("correct");
        
        // Update specific letter boxes so they animate in
        currentWord.split("").forEach((char, index) => {
            if (char === letter) {
                const box = document.getElementById(`letterbox-${index}`);
                box.innerText = char;
                box.classList.add("revealed", "correct-anim");
                // Remove animation class after it plays so it can be re-triggered if needed (not strictly necessary here but good practice)
                setTimeout(() => box.classList.remove("correct-anim"), 500);
            }
        });
        
        checkWin();
    } else {
        // Failure
        keyBtn.classList.add("wrong");
        keyBtn.disabled = true;
        failures++;
        
        // Shake screen slightly on error
        wrapper.classList.remove("shake");
        void wrapper.offsetWidth; // Trigger reflow
        wrapper.classList.add("shake");
        
        // Show next hangman part
        const partToShow = document.getElementById(`part-${failures - 1}`);
        if (partToShow) partToShow.classList.remove("hide");
        
        // Also show eyes if head is drawn (part 0)
        if (failures - 1 === 0) {
            document.getElementById("part-0-eye1").classList.remove("hide");
            document.getElementById("part-0-eye2").classList.remove("hide");
        }
        
        updateStatusPanel();
        checkLoss();
    }
}

function checkWin() {
    const hasWon = currentWord.split("").every(letter => guessedLetters.has(letter));
    if (hasWon) endGame(true);
}

function checkLoss() {
    if (failures >= MAX_MISTAKES) endGame(false);
}

function endGame(isWin) {
    isGameOver = true;
    
    // Add small delay for polish
    setTimeout(() => {
        gameModal.classList.remove("hide");
        modalBox.classList.add(isWin ? "win" : "lose");
        modalTitle.innerText = isWin ? "HACK SUCCESSFUL" : "SYSTEM COMPROMISED";
        modalMessage.innerHTML = isWin 
            ? `The encrypted payload was: <span class="highlight">${currentWord}</span>`
            : `Payload lost. The data was: <span class="highlight" style="color:var(--neon-red)">${currentWord}</span>`;
            
        // Flash effects or sound could go here
    }, 800);
}

// Global Keyboard Events
document.addEventListener("keydown", (e) => {
    if (e.key.match(/^[a-z]$/i) && !isGameOver) {
        handleGuess(e.key.toUpperCase());
    } else if (e.key === 'Enter' && isGameOver) {
        initGame();
    }
});

btnRestart.addEventListener("click", initGame);

// Spawn random background floating stars/data nodes for depth
function generateStars() {
    const starsContainer = document.getElementById("stars");
    for (let i = 0; i < 40; i++) {
        const star = document.createElement("div");
        star.style.position = "absolute";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = Math.random() > 0.5 ? "2px" : "1px";
        star.style.height = star.style.width;
        star.style.background = Math.random() > 0.5 ? "var(--neon-teal)" : "#fff";
        star.style.opacity = Math.random();
        star.style.boxShadow = `0 0 5px ${star.style.background}`;
        
        // Twinkle
        star.animate([
            { opacity: star.style.opacity, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(1)' },
            { opacity: star.style.opacity, transform: 'scale(1.5)' }
        ], {
            duration: 2000 + (Math.random() * 3000),
            iterations: Infinity,
            direction: "alternate",
            delay: Math.random() * -5000
        });
        
        starsContainer.appendChild(star);
    }
}

// Init completely
window.addEventListener("load", () => {
    generateStars();
    initGame();
});
