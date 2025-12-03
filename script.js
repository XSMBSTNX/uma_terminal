// =============================
//  UMA_CORE TERMINAL SCRIPT
//  (wersja: BOOT only)
// =============================

const terminal = document.getElementById("terminal");

let currentScene = "BOOT";
let waitingForInput = false;

// BOOT scene lines for UMA_CORE terminal
const BOOT_LINES = [
  { text: "[ UMA-CORE TERMINAL v0.7 ]     channel: /core/boot", className: "log-title" },
  { text: "", className: "log-line" },
  { text: "#connecting.to.server.data .........................#", className: "log-line" },
  { text: "> downloading {hash.code} : [QR.embed.data] .........", className: "log-line" },
  { text: "> connecting to internal KRN.filebase ...............", className: "log-line" },
  { text: "> checking internal integrity ........................", className: "log-line" },
  { text: "> internal.storage/file.check ....................... [OK]", className: "log-ok" },
  { text: "> mounting system ....................................", className: "log-line" },
  { text: "> isolating {program?} [uma-kernel] ..................", className: "log-line" },
  { text: "> requesting kernel.id main data_server .............. [1/3]", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "┌────────────────────────────────────────────────────┐", className: "log-line" },
  { text: "│ kernel.id\"\"version [kernel.id/krn03_onyx/v7.3]     │", className: "log-line" },
  { text: "│ localize.(kernel.id)                               │", className: "log-line" },
  { text: "│ KRN_STRT_QR_DATABASE_DISTRICT[0c002]               │", className: "log-line" },
  { text: "│ kernel.id                                          │", className: "log-line" },
  { text: "│ {name} [o▒▒ld.data▒▒▒▒▒▒]                          │", className: "log-line" },
  { text: "└────────────────────────────────────────────────────┘", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "> request terminated ................................ [!]", className: "log-err" },
  { text: "", className: "log-line" },
  { text: "ERROR   :: {kernel version incompatible}", className: "log-err" },
  { text: "NOTICE! :: connection suspended", className: "log-warn" },
  { text: "REASON  :: kernel version integrity [ERROR]", className: "log-err" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "> updating . . .", className: "log-line" },
  { text: "[▒████████▒▒█████████▒▒] [100%]", className: "log-ok" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "> update status ..................................... [OK]", className: "log-ok" },
  { text: "> isolating {program?} [uma-kernel] ................. [OK]", className: "log-ok" },
  { text: "> requesting kernel.id main data_server .............. [2/3]", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "┌────────────────────────────────────────────────────┐", className: "log-line" },
  { text: "│ {kernel.id}                                        │", className: "log-line" },
  { text: "│ {name} [krn03_onyx/v7.3]                           │", className: "log-line" },
  { text: "└────────────────────────────────────────────────────┘", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "> kernel.id check ................................... [OK]", className: "log-ok" },
  { text: "> downloading assets ................................ [COMPLETE]", className: "log-ok" },
  { text: "", className: "log-line" },
  { text: "=====================[ KERNEL v7.3 ]=====================", className: "log-title" },
  { text: "", className: "log-line" },
  { text: "\"ui.index_data\" not found — terminal will operate only in [LEGACY_MODE]\"", className: "log-warn" },
  { text: "", className: "log-line" },
  { text: "▓▒░ signal weak", className: "log-warn" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "╔════════════════════════════════════════════════════╗", className: "log-line" },
  { text: "║ [listing assets] [レガシー・モード]                        ║", className: "log-line" },
  { text: "║────────────────────────────────────────────────────║", className: "log-line" },
  { text: "║   [■■□□-DEV.DATA]                                  ║", className: "log-line" },
  { text: "║ ┌ [dev]:/uma_core                                  ║", className: "log-line" },
  { text: "║ ├─ [/flav_drivers#?]                               ║", className: "log-line" },
  { text: "║ ├─ [??/mem_shard03/{d▒▒▒a▒▒▒ta}] [CORRUPTED]       ║", className: "log-warn" },
  { text: "║ ├─ [boot.local.data]                               ║", className: "log-line" },
  { text: "║ │   ├─ [password.passer] + [shard-03]              ║", className: "log-line" },
  { text: "║ │   └─ [data.regex.dns]                            ║", className: "log-line" },
  { text: "║ └─ [Kernel_Vitals]                                 ║", className: "log-line" },
  { text: "║     ├─ [software.internal.data]                    ║", className: "log-line" },
  { text: "║     ├─ [irc.user.display/{wirefram3.engine}data?]  ║", className: "log-line" },
  { text: "║     └─ [netframework.demon]                        ║", className: "log-line" },
  { text: "╚════════════════════════════════════════════════════╝", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "\"/boot/uma-core[path]:/core/kernel.id/krn03_onyx/v7.3\"", className: "log-line" },
  { text: "system boot . . .", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "┌ TRACE.LOG 0x004F ──────────────────┐ ┌ SUBSYS: UMA_CORE ──────────┐", className: "log-line" },
  { text: "│ packets_in:     8821               │ │ cpu.temp:        43°C        │", className: "log-line" },
  { text: "│ packets_out:    0092               │ │ memory.alloc:    82%         │", className: "log-line" },
  { text: "└────────────────────────────────────┘ │ kernel: v7.3 / krn03         │", className: "log-line" },
  { text: "                                      │ kernel.stable:   [TRUE]       │", className: "log-line" },
  { text: "┌ SYSTEM ───────────────────────────┐ │ anomaly:         [TRUE]       │", className: "log-line" },
  { text: "│ cpu: 43%     temp: 43°C           │ └──────────────────────────────┘", className: "log-line" },
  { text: "│ ram: 61%     swap: 12%            │", className: "log-line" },
  { text: "└────────────────────────────────────┘", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "> boot files mounting . . .", className: "log-line" },
  { text: "> Decompressing dir. {UMA-core}", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "dir/files.......... [▒▒▒▒▒▒▒▒░▒▒▒▒▒]   [1/4]", className: "log-line" },
  { text: "dir/files.......... [▒▒▒▒▒▒▒░░░▒▒░]    [2/4]", className: "log-line" },
  { text: "dir/files.......... [▒░░░▒▒▒▒▒▒░]      [3/4]", className: "log-line" },
  { text: "dir/files.......... [■■■□□□#############/4]", className: "log-warn" },
  { text: "", className: "log-line" },
  { text: "\"STOP ............................................... [!]\"", className: "log-err" },
  { text: "\"process will continue after:\"", className: "log-line" },
  { text: "[data.fetch] ....................................... [complete]", className: "log-ok" },
  { text: "", className: "log-line" },
  { text: "> checking hardware fingerprint/data ............... [OK]", className: "log-ok" },
  { text: "> loading FLAV-drivers ............................. [OK]", className: "log-ok" },
  { text: "> netframework.demon ............................... [READY]", className: "log-ok" },
  { text: "> console.override = [correct]", className: "log-line" },
  { text: "> loading assets . . .", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "┌────────────────────────────────────────────────────┐", className: "log-line" },
  { text: "│ [!]   WARN: cache corrupted                     [!] │", className: "log-warn" },
  { text: "│ [!]   ERR: shard-03 read FAIL                  [!] │", className: "log-err" },
  { text: "└────────────────────────────────────────────────────┘", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "> FILE : [shard-03] read fail", className: "log-err" },
  { text: "\"cannot perform system installation\"", className: "log-err" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "??# [SAFETY.GATE] performing {kernel.id} lockdown", className: "log-warn" },
  { text: "> lockdown.progress ................. [■■■■■□□□□□□] [47%] ((ERR!))", className: "log-err" },
  { text: "> shutting down UMA-core //           [FAST.on]", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "\"saving {kernel.id}{data.file}{state} with [fallback.STM.exe]\"", className: "log-line" },
  { text: "> initializing fallback.STM.exe", className: "log-line" },
  { text: "  initializing... [▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒] ", className: "log-line" },
  { text: "> attempt............................ [1/3]", className: "log-line" },
  { text: "> {kernel.id} state.................. [stable]", className: "log-ok" },
  { text: "> console.override................... [correct]", className: "log-line" },
  { text: "> restoring from cache............... [OK]", className: "log-ok" },
  { text: "> {kernel.id} state.................. [SAVED]", className: "log-ok" },
  { text: "> shutting down UMA-core ............ [OK]", className: "log-ok" },
  { text: "> lockdown.progress ................. [████▒▒▒▒▒▒] [47%] ((ERR!))", className: "log-err" },
  { text: "", className: "log-line" },
  { text: "> initializing fallback.STM.exe", className: "log-line" },
  { text: "  initializing... [▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒]", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "> restoring from cache . . .", className: "log-line" },
  { text: "> restore ........................... [complete]", className: "log-ok" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "pending . . .", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "\"[user] redirecting to [fallback.stm] . . .\"", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "> proceed ........................................... [?]", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "       ┌──────────────────────[ CONFIRM ]──────────────────────┐", className: "log-title" },
  { text: "       │ [user] redirect to?                                   │", className: "log-line" },
  { text: "       │        [fallback.stm]?                                │", className: "log-line" },
  { text: "       │                                                       │", className: "log-line" },
  { text: "       │        [Y] yes                     [N] no             │", className: "log-line" },
  { text: "       └────────────────────────────────────────────────────────┘", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "", className: "log-line" },
  { text: "{ animation → transition to FALLBACK STORM }", className: "log-line" },
];

function clearScreen() {
  terminal.innerHTML = "";
}

function printLines(lines, callback) {
  let index = 0;

  function next() {
    if (index >= lines.length) {
      waitingForInput = true;
      if (callback) callback();
      return;
    }

    const lineSpec = lines[index];
    const lineEl = document.createElement("div");

    lineEl.textContent = lineSpec.text || "";
    lineEl.classList.add("log-line");
    if (lineSpec.className) {
      lineEl.classList.add(lineSpec.className);
    }

    terminal.appendChild(lineEl);

    index++;
    const delay = 200 + Math.random() * 200;
    setTimeout(next, delay);
  }

  next();
}

function startScene(sceneName) {
  clearScreen();
  waitingForInput = false;
  currentScene = sceneName;

  if (sceneName === "BOOT") {
    printLines(BOOT_LINES);
  }
}

function handleContinue() {
  if (!waitingForInput) return;

  if (currentScene === "BOOT") {
    const lineEl = document.createElement("div");
    lineEl.classList.add("log-line");
    lineEl.textContent = ">> FALLBACK.STM [WIP]";
    terminal.appendChild(lineEl);
    waitingForInput = false;
  }
}

window.addEventListener("keydown", handleContinue);
window.addEventListener("click", handleContinue);
window.addEventListener("touchstart", handleContinue);

window.addEventListener("DOMContentLoaded", () => {
  startScene("BOOT");
});
