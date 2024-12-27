const roundLengthSettings = document.getElementById("roundLengthSettings");
const smallBlindSettings = document.getElementById("smallBlindSettings");
const bigBlindSettings = document.getElementById("bigBlindSettings");
const maxSmallBlindSetting = document.getElementById("maxSmallBlindSettings");
const maxBigBlindSetting = document.getElementById("maxBigBlindSettings");
const factorSettings = document.getElementById("factorSettings");
const saveBtn = document.getElementById("saveBtn");
const defaultBtn = document.getElementById("defaultBtn");

saveBtn.addEventListener("click", save)
defaultBtn.addEventListener("click", defaultSettings)

function save() {
    chrome.storage.sync.set({
        roundLength: roundLengthSettings.value,
        smallBlind: smallBlindSettings.value,
        bigBlind: bigBlindSettings.value,
        maxSmallBlind: maxSmallBlindSetting.value,
        maxBigBlind: maxBigBlindSetting.value,
        factor: factorSettings.value
    })
}

function defaultSettings() {
    chrome.storage.sync.set({
        roundLength: 30,
        smallBlind: 25,
        bigBlind:50,
        maxSmallBlind: 1000,
        maxBigBlind: 2000,
        factor: 2
    })
}