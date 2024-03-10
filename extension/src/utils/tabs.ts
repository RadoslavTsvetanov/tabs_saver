import { Change, Snapshot } from "../models/Users";

export class TabManager {
  static createTabObjectForApi(tab: chrome.tabs.Tab) {
    return {
      tab_id_given_from_chrome_api: tab.id,
      title: tab.title,
      url: tab.url,
    };
  }

  static logTabs(tabs: chrome.tabs.Tab[]) {
    return tabs.map((tab) => {
      return this.createTabObjectForApi(tab);
    });
  }

  static logAllTabs() {
    const tabs = chrome.tabs
      .query({})
      .then((tabs: chrome.tabs.Tab[]) => {
        const formattedTabs = this.logTabs(tabs);
        console.dir(formattedTabs);
        return formattedTabs;
      })

      .catch((error) => {
        console.error("Error:", error);
      });
    return tabs;
  }

  static openTab(url: string) {
    chrome.tabs.create({ url });
  }

  static revertChanges(change: Change) {
    console.log(change);
  }

  static restore_to_snapshot(snapshot: Snapshot) {
    for (let i = 0; i < snapshot.tabs.length; i++) {
      this.openTab(snapshot.tabs[i].url);
    }
  }
}
