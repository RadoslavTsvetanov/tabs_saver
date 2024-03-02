import { Tab, Change, Snapshot } from "../../../backend/src/models/Users";

export class TabManager {
  static createTabObjectForApi(tab: Tab) {
    return {
      id: tab.id,
      title: tab.title,
      url: tab.url,
    };
  }

  static logTabs(tabs: Tab[]) {
    return tabs.map((tab) => {
      return this.createTabObjectForApi(tab);
    });
  }

  static logAllTabs() {
    chrome.tabs
      .query({})
      .then((tabs: chrome.tabs.Tab[]) => {
        const formattedTabs = this.logTabs(tabs as Tab[]);
        console.dir(formattedTabs);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  static openTab(url: string) {
    chrome.tabs.create({ url });
  }

  static revertChanges(change: Change) {
    console.log(change);
  }


  static restore_to_snapshot(snapshot: Snapshot){
    for (let i = 0; i < snapshot.tabs.length; i++){
      this.openTab(snapshot.tabs[i].url)
    }
  }


}


