// Prosty BOOT – na razie „placeholder” pod Twoją narrację

const lines = [
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

const terminal = document.getElementById("terminal");

let currentLine = 0;

function printNextLine() {
  if (currentLine >= lines.length) {
    // po zakończeniu bootowania możemy dodać np. kursor
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    cursor.textContent = " ";
    terminal.appendChild(document.createTextNode("\n\nREADY // "));
    terminal.appendChild(cursor);
    return;
  }

  const line = lines[currentLine];

  // Doklejamy linię do terminala
  terminal.textContent += line + "\n";

  currentLine++;

  // Minimalne opóźnienie między liniami (tu możemy się bawić klimatem)
  const delay = 200 + Math.random() * 200; // 200–400 ms
  setTimeout(printNextLine, delay);
}

// Start boot sequence po załadowaniu DOM
window.addEventListener("DOMContentLoaded", () => {
  printNextLine();
});
