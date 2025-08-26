// === HAMBURGER MENU ===
const hamburger = document.querySelector(".hamburger");
const sideMenu = document.querySelector(".side-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
        hamburger.classList.toggle("active");
    });
}

// === USER AUTH ===
const loginButton = document.querySelector("#login-btn");
const registerButton = document.querySelector("#register-btn");
const logoutButton = document.querySelector("#logout-btn");
const userDisplay = document.querySelector("#user-display");

// Simulate persistent login using localStorage
let loggedInUser = localStorage.getItem("apollo_user");

// Update UI based on login state
function updateAuthUI() {
    if (loggedInUser) {
        if (userDisplay) {
            userDisplay.textContent = `Welcome, ${loggedInUser}`;
            userDisplay.style.display = "inline";
        }
        if (loginButton) loginButton.style.display = "none";
        if (registerButton) registerButton.style.display = "none";
        if (logoutButton) logoutButton.style.display = "inline";
    } else {
        if (userDisplay) userDisplay.style.display = "none";
        if (loginButton) loginButton.style.display = "inline";
        if (registerButton) registerButton.style.display = "inline";
        if (logoutButton) logoutButton.style.display = "none";
    }
}
updateAuthUI();

// Handle login click
if (loginButton) {
    loginButton.addEventListener("click", () => {
        const username = prompt("Enter your username:");
        if (username) {
            localStorage.setItem("apollo_user", username);
            loggedInUser = username;
            updateAuthUI();
            unlockEarlyAccess();
        }
    });
}

// Handle register click → auto-login
if (registerButton) {
    registerButton.addEventListener("click", () => {
        const username = prompt("Choose a username:");
        if (username) {
            alert(`Account created! Welcome, ${username}!`);
            localStorage.setItem("apollo_user", username);
            loggedInUser = username;
            updateAuthUI();
            unlockEarlyAccess();
        }
    });
}

// Handle logout
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("apollo_user");
        loggedInUser = null;
        updateAuthUI();
    });
}

// === PLAYER BAR ===
const playerBar = document.querySelector(".player-bar");
const playPauseBtn = document.querySelector("#play-pause");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const songTitle = document.querySelector("#song-title");

// Dummy playlist
const playlist = [
    "Midnight City - Apollo",
    "Stardust Dreams - Apollo",
    "Neon Horizon - Apollo",
    "Eclipse Waves - Apollo"
];

let currentSongIndex = 0;
let isPlaying = false;

// Show current song
function updateSong() {
    if (songTitle) songTitle.textContent = playlist[currentSongIndex];
}
updateSong();

// Toggle play/pause
if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        playPauseBtn.textContent = isPlaying ? "⏸ Pause" : "▶ Play";
        playerBar.classList.add("active");
    });
}

// Next song
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        updateSong();
    });
}

// Previous song
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        updateSong();
    });
}

// === EARLY ACCESS LOCK ===
function unlockEarlyAccess() {
    const lockedSections = document.querySelectorAll(".locked-overlay");
    lockedSections.forEach((overlay) => {
        if (loggedInUser) {
            overlay.style.display = "none";
        } else {
            overlay.style.display = "flex";
        }
    });
}
unlockEarlyAccess();

// === BLOG / LATEST NEWS ===
const blogContainer = document.querySelector("#blog-container");

const blogPosts = [
    {
        title: "Apollo Records signs rising artist Nova!",
        date: "Aug 25, 2025",
        content: "We're excited to announce that Nova has joined the Apollo family. Expect new tracks soon!"
    },
    {
        title: "Early Access Update - New Albums!",
        date: "Aug 20, 2025",
        content: "We've added 5 exclusive tracks to Early Access. Log in to check them out."
    },
    {
        title: "Apollo Records x Spotify Partnership",
        date: "Aug 15, 2025",
        content: "Stream our exclusive playlists on Spotify now!"
    }
];

if (blogContainer) {
    blogPosts.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("blog-card");
        card.innerHTML = `
            <h3>${post.title}</h3>
            <p><small>${post.date}</small></p>
            <p>${post.content}</p>
        `;
        blogContainer.appendChild(card);
    });
}