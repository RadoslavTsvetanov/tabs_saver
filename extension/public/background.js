// Define action_type
const action_type = {
  delete: 0,
  change: 1,
  created: 2,
};

// Function to create a request object
function make_req(tab, action, reqType) {
  return {
    method: reqType,
    body: JSON.stringify({ tab, action }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

class User {}

// API class for sending requests
class API {
  constructor() {
    this.endpoint = "https://example.com/api"; // Your endpoint URL
  }

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

// Instantiate API
const api = new API();

// Function to retrieve username
function retrieve_username() {
  browser.storage.session.get("username").then((result) => {
    console.dir("Value is ", result.username);
  });
}

// Function to create a tab object for API
function create_tab_object_for_api(tab) {
  return {
    id: tab.id,
    title: tab.title,
    url: tab.url,
  };
}

// Function to create a change object for API
function create_change_object_for_api(tab, change_type) {
  const formatted_tab = create_tab_object_for_api(tab);
  return {
    tab: formatted_tab,
    type_of_change: change_type,
  };
}

// Function to log all tabs
function log_all_tabs() {
  browser.tabs
    .query({})
    .then((tabs) => {
      const formatted_tabs = tabs.map(create_tab_object_for_api);
      console.log(formatted_tabs);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Log all tabs initially
log_all_tabs();

// Event listener for tab creation
browser.tabs.onCreated.addListener((tab) => {
  retrieve_username();
  console.log(create_change_object_for_api(tab, "createdTab"));
});

// Event listener for tab update
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(create_change_object_for_api(tab, "updatedTab"));
});

// Event listener for tab removal
browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.dir("Removed tab:", tabId, removeInfo);
});

// Periodically log all tabs
setInterval(log_all_tabs, 5 * 1000); // Log every 5 seconds
