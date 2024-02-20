function logTabs(tabs) {
  tabs.forEach((tab) => {
    console.log("Tab ID:", tab.id);
    console.log("Title:", tab.title);
    console.log("URL:", tab.url);
  });
}

function log_all_tabs() {
  browser.tabs
    .query({})
    .then((tabs) => {
      logTabs(tabs);
    })
    .catch((error) => {
      console.error("Error: !!!!!!!!!!!!!!!!!!!!!!", error);
    });
}

log_all_tabs();

browser.tabs.onCreated.addListener((tab) => {
  console.log("New Tab Created:");
  console.log("Tab ID:", tab.id);
  console.log("Title:", tab.title);
  console.log("URL:", tab.url);
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Tab Updated:");
  console.log("Tab ID:", tabId);
  console.log("Title:", tab.title);
  console.log("URL:", tab.url);
});

let timer = 0;
let every_5_seconds = 5 * 1000;
let every_minute = 1000 * 60;
let schedule_run = every_5_seconds;
setInterval(() => {
  timer += schedule_run;

  if (timer >= every_minute) {
    timer = 0;

    log_all_tabs();
  }
}, schedule_run);
