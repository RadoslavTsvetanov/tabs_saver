const changes = {
  CLOSED_TAB: "closedTab",
  CREATED_TAB: "createdTab",
  CHANGED_TAB: "changedTab",
  TAKEN_NEW_SNAPSHOT: "newSnapshot",
};

class API {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async addChangeToSession(sessionId, change) {
    try {
      const response = await fetch(
        `${this.baseUrl}/session/${sessionId}/change`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ change }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to send request: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding change to session:", error);
      throw new Error("Error adding change to session");
    }
  }
}

const api = new API("http://localhost:3000");

api
  .addChangeToSession(5, {
    type_of_change: changes.CLOSED_TAB,
    tab: {
      tab_id_given_from_chrome_api: 1,
      url: "example.com",
      title: "Example",
    },
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
