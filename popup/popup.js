const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", start)
stopBtn.addEventListener("click", stop)
resetBtn.addEventListener("click", reset)

setInterval(updateTimer, 1000);

function start() {
    chrome.storage.sync.set({ isRunning: true })
}

function stop() {
    chrome.storage.sync.set({ isRunning: false })
}

function reset() {
    chrome.storage.sync.set({
        timer: 0,
        isRunning: false,
        smallBlind: 25,
        bigBlind: 50
    })
}

async function updateTimer() {
    const timerDiv = document.getElementById("timer");
    const smallBlindValue = document.getElementById("smallBlindValue");
    const bigBlindValue = document.getElementById("bigBlindValue");
    const { smallBlind, bigBlind, timer, roundLength } =
        await chrome.storage.sync.get(["smallBlind", "bigBlind", "timer", "roundLength"])
    const minutes = `${roundLength - Math.ceil(timer / 60)}`.padStart(2, "0")
    const seconds = timer % 60 == 0 ?'00' : `${60 - timer % 60}`.padEnd(2, "0")
    timerDiv.innerText = `${minutes}:${seconds}`
    smallBlindValue.innerText = smallBlind
    bigBlindValue.innerHTML = bigBlind
}