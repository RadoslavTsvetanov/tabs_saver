const axios = require("axios");

// Define the base URL
const baseURL = "http://localhost:3000";

// Function to handle errors
function handleError(error) {
  console.error("Error:", error.response.data);
}

// Create a new user
async function createUser(name, email) {
  try {
    const response = await axios.post(`${baseURL}/user`, { name, email });
    console.log("Created User:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Add a session to a user
async function addSessionToUser(userId, session) {
  try {
    const response = await axios.post(`${baseURL}/user/${userId}/session`, {
      session,
    });
    console.log("Added Session to User:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Add a change to a session
async function addChangeToSession(sessionId, change) {
  try {
    const response = await axios.post(
      `${baseURL}/session/${sessionId}/change`,
      { change }
    );
    console.log("Added Change to Session:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Get a session by ID
async function getSession(sessionId) {
  try {
    const response = await axios.get(`${baseURL}/session/${sessionId}`);
    console.log("Retrieved Session:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Get a user by username
async function getUser(username) {
  try {
    const response = await axios.get(`${baseURL}/user/${username}`);
    console.log("Retrieved User:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Test the API endpoints
(async () => {
  // Create a user
  const user = await createUser("pipe", "john@example.com");

  // Add a session to the user
  const session = await addSessionToUser(user.id, {
    creation_date: new Date(),
    BaseSnapshotData: {
      tabs: [
        {
          tab_id_given_from_chrome_api: 1,
          url: "example.com",
          title: "Example",
        },
      ],
    },
  });

  // Add a change to the session
  await addChangeToSession(session.id, {
    type_of_change: "Change Type",
    tab: {
      tab_id_given_from_chrome_api: 1,
      url: "example.com",
      title: "Example",
    },
  });

  // Get the session
  await getSession(session.id);

  // Get the user
  await getUser("John Doe");
})();
