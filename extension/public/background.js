class ChromeStorage {
  static async getValue(key) {
    const result = await browser.storage.local.get(key);
    return result[key];
  }

  static async setValue(key, value) {
    await browser.storage.local.set({ [key]: value });
  }
}

const ActionType = {
  DELETE: 0,
  CHANGE: 1,
  CREATED: 2,
};

class API {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async sendTabChange(tab, action, reqType) {
    try {
      const req = this._makeRequest(tab, action, reqType);
      const response = await fetch(this.endpoint, req);
      if (!response.ok) {
        throw new Error(
          `Failed to send request: ${response.status} - ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log("Request sent successfully:", data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  _makeRequest(tab, action, reqType) {
    return {
      method: reqType,
      body: JSON.stringify({ tab, action }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
}

const api = new API("https://example.com/api");

class TabFormatter {
  static createTabObject(tab) {
    return {
      id: tab.id,
      title: tab.title,
      url: tab.url,
    };
  }

  static createChangeObject(tab, changeType) {
    const formattedTab = this.createTabObject(tab);
    return {
      tab: formattedTab,
      typeOfChange: changeType,
    };
  }
}

function logAllTabs() {
  browser.tabs
    .query({})
    .then(async (tabs) => {
      const formattedTabs = tabs.map(TabFormatter.createTabObject);
      console.log(formattedTabs);
      console.log("Storage:", await ChromeStorage.getValue("username"));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

logAllTabs();
class TabEventListenerManager {
  constructor() {
    this.listeners = [];
  }

  addEventListener(eventType, callback) {
    this.listeners.push({ eventType, callback });
  }

  async handleTabListener(argsObj) {
    if (await this.shouldListenForTabs()) {
      console.log("args", argsObj.args);
      const tab = argsObj.args[0]; // Extract the tab from args array

      const callback = argsObj.callback;
      await callback(...argsObj.args);
    }
  }

  async shouldListenForTabs() {
    // Assuming ChromeStorage is defined somewhere
    const username = await ChromeStorage.getValue("username");
    const isSessionRestoring = await ChromeStorage.getValue(
      "is_a_session_being_restored"
    );
    const currentSession = await ChromeStorage.getValue("current_session");

    return (
      username !== "" &&
      username !== undefined &&
      !isSessionRestoring &&
      currentSession !== -1 &&
      currentSession !== undefined
    );
  }

  setupListeners() {
    this.listeners.forEach((listener) => {
      chrome.tabs[listener.eventType].addListener((...args) => {
        const argsObj = { args }; // Pass arguments as an array
        argsObj.callback = listener.callback;
        this.handleTabListener(argsObj);
      });
    });
  }
}

const tabEventManager = new TabEventListenerManager();
let last_update = undefined;
// Add event listeners
tabEventManager.addEventListener("onCreated", (tab) => {
  console.log("Added");
  console.log("tab", tab);
});

tabEventManager.addEventListener(
  "onUpdated",
  async (tabId, changeInfo, tab) => {
    // since when updating a tab it gies through multiple update steps to not flood the db with unnecessary updates we check if the last updated tab sent is the same as the current one to check if it is the same change
    if (tab.status === "loading") {
      return;
    }

    console.log("last update", last_update);
    if (last_update !== undefined) {
      if (last_update.url === tab.url && last_update.id === tab.id) {
        return;
      }
    }

    last_update = {
      url: tab.url,
      id: tab.id,
    };
    tab.favIconUrl = "";
    //? ask if i should move this in in its own function to improve readability
    console.log("Updated");
    console.dir("tab", tab);
    console.dir("tabId", tabId);
    // Custom logic for tab update
  }
);

// Add more listener objects as needed

// Set up all listeners
tabEventManager.setupListeners();
