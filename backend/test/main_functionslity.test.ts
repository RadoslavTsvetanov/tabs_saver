import axios from 'axios';

interface User {
  id: any;
  name: string;
  email: string;
}

interface Session {
  id: any;
  session: string;
}

interface Change {
  change: string;
}

interface DbResponse<T> {
  [x: string]: any;
  data: T;
}

const baseURL = 'http://localhost:3000';

async function createUser(user: User): Promise<DbResponse<User>> {
  try {
    const response = await axios.post<User>(`${baseURL}/user`, user);
    return response;
  } catch (error) {
    throw new Error('Error creating user');
  }
}

async function addSessionToUser(userId: number, session: Session): Promise<DbResponse<Session>> {
  try {
    const response = await axios.post<Session>(`${baseURL}/user/${userId}/session`, session);
    return response;
  } catch (error) {
    throw new Error('Error adding session to user');
  }
}

async function addChangeToSession(sessionId: number, change: Change): Promise<DbResponse<Change>> {
  try {
    const response = await axios.post<Change>(`${baseURL}/session/${sessionId}/change`, change);
    return response;
  } catch (error) {
    throw new Error('Error adding change to session');
  }
}

async function getSession(sessionId: number): Promise<DbResponse<Session>> {
  try {
    const response = await axios.get<Session>(`${baseURL}/session/${sessionId}`);
    return response;
  } catch (error) {
    throw new Error('Error retrieving session');
  }
}

async function getUser(username: string): Promise<User> {
  try {
    const response = await axios.get(`${baseURL}/user/${username}`);
    return response;
  } catch (error) {
    throw new Error('Error retrieving user');
  }
}

// Usage example
(async () => {
  try {
    // Create a user
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    const createdUserResponse = await createUser(newUser);
    console.log('Created User:', createdUserResponse.data);

    // Add a session to the user
    const userId = createdUserResponse.data.id; // Assuming the response has an 'id' field
    const newSession: Session = {
      session: 'example_session'
    };
    const addedSessionResponse = await addSessionToUser(userId, newSession);
    console.log('Added Session:', addedSessionResponse.data);

    // Retrieve a session
    const sessionId = addedSessionResponse.data.id; // Assuming the response has an 'id' field
    const retrievedSessionResponse = await getSession(sessionId);
    console.log('Retrieved Session:', retrievedSessionResponse.data);

    // Retrieve a user
    const username = 'john';
    const retrievedUserResponse = await getUser(username);
    console.log('Retrieved User:', retrievedUserResponse.data);
  } catch (error) {
    console.error(error);
  }
})();
