// =========================
//   SYSTEM SCEN UMA_CORE
// =========================

let currentScene = "BOOT";
let waitingForInput = false;

const terminal = document.getElementById("terminal");

// --------------
// SCENA: BOOT
// --------------

const BOOT_LINES = [
  "UMA_CORE v0.1.3  [DIAGNOSTIC BUILD]",
  "------------------------------------------------",
  "INIT  :: mounting system volumes...",
  "OK    :: /dev/uma_core",
  "OK    :: /dev/flav_drivers",
  "WARN  :: /dev/mem_shard03  [CORRUPTED]",
  "",
  "SCAN  :: verifying integrity...",
  "FAIL  :: cache mismatch [id:shard03]",
  "FAIL  :: unauthorized write in /net/logs",
  "",
  "HINT  :: press any key to continue boot sequence...",
];


// --------------
// SCENA: BOOT_2
// --------------

const BOOT2_LINES = [
  "",
  "--------------------------------------------",
  "UMA_BOOTLOADER v2.02",
  "STATUS :: suspended",
  "",
  "REASON :: unauthorized activity detected",
  "",
  "SCAN   :: scanning connected device...",
  "SCAN   :: checking integrity...",
  "SCAN   :: reading hardware fingerprint...",
  "",
  "RESULT :: [INTRUDER DETECTED] !!!",
  "",
  "OVERRIDE :: system override locked...",
  "OVERRIDE :: attempting fallback mode...",
  "",
  "HINT :: system requires manual confirmation...",
  "PRESS ANY KEY TO CONTINUE...",
];


// =========================
//   FUNKCJE WSPÓLNE
// =========================

function clearScreen() {
  terminal.textContent = "";
}

function printLines(lines, callback) {
  let index = 0;

  function next() {
    if (index >= lines.length) {
      waitingForInput = true;
      if (callback) callback();
      return;
    }
    terminal.textContent += lines[index] + "\n";
    index++;

    const delay = 180 + Math.random() * 220;
    setTimeout(next, delay);
  }

  next();
}


// =========================
//   URUCHAMIANIE SCEN
// =========================

function startScene(sceneName) {
  clearScreen();
  waitingForInput = false;
  currentScene = sceneName;

  if (sceneName === "BOOT") {
    printLines(BOOT_LINES);
  }

  if (sceneName === "BOOT_2") {
    printLines(BOOT2_LINES);
  }
}


// =========================
//   EVENT: TAP / KLIK / KEY
// =========================

function handleContinue() {
  if (!waitingForInput) return;

  if (currentScene === "BOOT") {
    startScene("BOOT_2");
  }

  else if (currentScene === "BOOT_2") {
    // tu zrobimy SCREEN STORM
    clearScreen();
    terminal.textContent = ">> STORM MODE [WIP]\n";
  }
}

window.addEventListener("keydown", handleContinue);
window.addEventListener("click", handleContinue);
window.addEventListener("touchstart", handleContinue);


// =========================
//   START
// =========================

window.addEventListener("DOMContentLoaded", () => {
  startScene("BOOT");
});