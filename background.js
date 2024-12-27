chrome.alarms.create("pokerTime", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== "pokerTime") return;
  const { roundLength, timer, isRunning } = await chrome.storage.sync.get([
    "roundLength",
    "timer",
    "isRunning",
  ]);
  if (!isRunning) return;
  if (timer === roundLength * 60) {
    await chrome.notifications.create("pokerTimerNotification", {
      message: "Time up!",
      title: "Time up!",
      iconUrl: "./popup/icon.png",
      type: "basic",
    });
    let { smallBlind, bigBlind, maxSmallBlind, maxBigBlind, factor } =
      await chrome.storage.sync.get([
        "smallBlind",
        "bigBlind",
        "maxSmallBlind",
        "maxBigBlind",
        "factor",
      ]);
    smallBlind = Math.min(smallBlind * factor, maxSmallBlind);
    bigBlind = Math.min(bigBlind * factor, maxBigBlind);
    chrome.storage.sync.set({
      timer: 0,
      smallBlind: smallBlind,
      bigBlind: bigBlind,
    });
    return;
  }
  chrome.storage.sync.set({ timer: timer + 1 });
});

chrome.storage.sync.get(
  [
    "timer",
    "isRunning",
    "roundLength",
    "smallBlind",
    "bigBlind",
    "maxSmallBlind",
    "maxBigBlind",
    "factor",
  ],
  (res) => {
    chrome.storage.sync.set({
      timer: "timer" in res ? res.timer : 0,
      isRunning: "isRunning" in res ? res.isRunning : false,
      roundLength: "roundLength" in res ? res.roundLength : 30,
      smallBlind: "smallBlind" in res ? res.smallBlind : 25,
      bigBlind: "bigBlind" in res ? res.bigBlind : 50,
      maxSmallBlind: "maxSmallBlind" in res ? res.maxSmallBlind : 1000,
      maxBigBlind: "maxBigBlind" in res ? res.maxBigBlind : 2000,
      factor: "factor" in res ? res.factor : 2,
    });
  }
);
