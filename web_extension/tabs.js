function logTabs(tabs) {
  tabs.forEach((tab) => {
    console.log("Tab ID:", tab.id);
    console.log("Title:", tab.title);
    console.log("URL:", tab.url);
  });
}

export function log_all_tabs() {
  browser.tabs
    .query({})
    .then((tabs) => {
      logTabs(tabs);
    })
    .catch((error) => {
      console.error("Error: !!!!!!!!!!!!!!!!!!!!!!", error);
    });
}
