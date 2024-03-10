const axios = require("axios");

const baseURL = "http://localhost:3000";

function handleError(error) {
  console.error("Error:", error.response.data);
}

async function createUser(name, email) {
  try {
    const response = await axios.post(`${baseURL}/user`, { name, email });
    console.log("Created User:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

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

async function getSession(sessionId) {
  try {
    const response = await axios.get(`${baseURL}/session/${sessionId}`);
    console.log("Retrieved Session:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

async function getUser(username) {
  try {
    const response = await axios.get(`${baseURL}/user/${username}`);
    console.log("Retrieved User:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

(async () => {
  const user = await createUser("pipe", "john@example.com");

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

  await addChangeToSession(session.id, {
    type_of_change: "Change Type",
    tab: {
      tab_id_given_from_chrome_api: 1,
      url: "example.com",
      title: "Example",
    },
  });

  await getSession(session.id);

  await getUser("John Doe");
})();
