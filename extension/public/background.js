/**
 * Class representing ChromeStorage for interacting with Chrome's local storage API.
 */
class ChromeStorage {
  /**
   * Get a value from Chrome's local storage.
   * @param {string} key - The key of the value to retrieve.
   * @returns {Promise<any>} - A promise that resolves with the retrieved value.
   */
  static async get_value(key) {
    const result = await chrome.storage.local.get(key);
    return result[key];
  }

  /**
   * Set a value in Chrome's local storage.
   * @param {string} key - The key under which to store the value.
   * @param {any} value - The value to store.
   * @returns {Promise<void>} - A promise that resolves when the value is set.
   */
  static async set_value(key, value) {
    await chrome.storage.local.set({ [key]: value });
  }
}

/**
 * Function to build storage functions based on a schema.
 * @param {Record<string, any>} schema - The schema defining the structure of storage.
 * @returns {Record<string, { get: () => Promise<any>, set: (value: any) => Promise<void> }>} - The storage functions.
 */
function StorageBuilder(schema) {
  const storageFunctions = {};

  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      storageFunctions[key] = {
        /**
         * Get a value from storage.
         * @returns {Promise<any>} - A promise that resolves with the retrieved value.
         */
        get: async () => await ChromeStorage.get_value(key),
        /**
         * Set a value in storage.
         * @param {any} value - The value to set.
         * @returns {Promise<void>} - A promise that resolves when the value is set.
         */
        set: async (value) => await ChromeStorage.set_value(key, value),
      };
    }
  }

  return storageFunctions;
}

/**
 * Function to create storage functions based on a schema.
 * @param {Record<string, any>} schema - The schema defining the structure of storage.
 * @returns {Record<string, { get: () => Promise<any>, set: (value: any) => Promise<void> }>} - The storage functions.
 */
function createStorage(schema) {
  return StorageBuilder(schema);
}

/**
 * The storage functions generated based on the provided schema.
 */
const storageFunctions = createStorage({
  username: "", // Initial value for username
  current_session: -1, // Initial value for current session
});

//-------------------------------------------------
//TODO how to import in file background

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
    .then(async (tabs) => {
      const formatted_tabs = tabs.map(create_tab_object_for_api);
      console.log(formatted_tabs);
      console.log("storrage.....", await storageFunctions.username.get());
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
