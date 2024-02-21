//TODO fix this -> const browser = browser || chrome

const action_type = {
  delete: 0,
  change: 1,
  created: 2,
};

/**
 * Creates a request object with tab details and action.
 * @param {Object} tab - The tab object containing url and title.
 * @param {string} action - The action to perform on the tab.
 * @param {string} reqType - The type of request (e.g., 'GET', 'POST').
 * @returns {Object} The request object.
 */
function make_req(tab, action, reqType) {
  return {
    method: reqType,
    body: JSON.stringify({ tab, action }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

class API {
  constructor() {
    this.endpoint = "https://example.com/api"; // Your endpoint URL
  }

  /**
   * Sends a tab change request to the server.
   * @param {Object} tab - The tab object containing url and title.
   * @param {string} action - The action to perform on the tab.
   * @param {string} reqType - The type of request (e.g., 'GET', 'POST').
   */
  async send_tab_change(tab, action, reqType) {
    try {
      const req = make_req(tab, action, reqType);
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
}

// Example usage:
const api = new API();
const tab = { url: "https://example.com", title: "Example" };

function retrieve_username() {
  browser.storage.session.get("username").then((result) => {
    console.dir("Value is ", result.username);
  });
}

function create_tab_object_for_api(tab) {
  return {
    id: tab.id,
    title: tab.title,
    url: tab.url,
  };
}

function create_change_object_for_api(tab, change_type) {
  const formatted_tab = create_tab_object_for_api(tab);
  return {
    tab: formatted_tab,
    type_of_change: change_type,
  };
}

function logTabs(tabs) {
  // tabs.forEach((tab) => {
  //   console.log("Tab ID:", tab.id);
  //   console.log("Title:", tab.title);
  //   console.log("URL:", tab.url);
  // });
  return tabs.map((tab) => {
    return create_tab_object_for_api(tab);
  });
}

function log_all_tabs() {
  browser.tabs
    .query({})
    .then((tabs) => {
      const formatted_tabs = logTabs(tabs);
      console.log(formatted_tabs);
    })
    .catch((error) => {
      console.error("Error: !!!!!!!!!!!!!!!!!!!!!!", error);
    });
}

log_all_tabs();

browser.tabs.onCreated.addListener((tab) => {
  retrieve_username();
  console.log(create_change_object_for_api(tab, "createdTab"));
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(create_change_object_for_api(tab, "updatedTab"));
});

browser.tabs.onRemoved.addListener((tab, removed_info) => {
  console.dir("hfurhfurhfurf", tab, removed_info);
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
