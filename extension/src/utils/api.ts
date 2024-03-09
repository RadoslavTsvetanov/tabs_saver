import axios, { AxiosResponse } from 'axios';
import {User,Session,Change} from "../models/Users"
// Define interfaces for the data types used in the endpoints

interface UserResponse {
  data: User;
  status: number;
  err?: string;
}

interface SessionResponse {
  data: Session;
  status: number;
  err?: string;
}

interface ChangeResponse {
  data: Change;
  status: number;
  err?: string;
}

// Define the API class

export class API {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async createUser(name: string, email: string | null = null): Promise<UserResponse> {
    try {
      const response: AxiosResponse<UserResponse> = await axios.post<UserResponse>(`${this.baseURL}/user`, { name, email });
      return response.data;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  async addSessionToUser(userId: number, session: Session): Promise<SessionResponse> {
    try {
      const response: AxiosResponse<SessionResponse> = await axios.post<SessionResponse>(`${this.baseURL}/user/${userId}/session`, { session });
      return response.data;
    } catch (error) {
      throw new Error('Error adding session to user');
    }
  }

  async addChangeToSession(sessionId: number, change: Change): Promise<ChangeResponse> {
    try {
      const response: AxiosResponse<ChangeResponse> = await axios.post<ChangeResponse>(`${this.baseURL}/session/${sessionId}/change`, { change });
      return response.data;
    } catch (error) {
      throw new Error('Error adding change to session');
    }
  }

  async getSession(sessionId: number): Promise<Session> {
    try {
      const response: AxiosResponse<Session> = await axios.get<Session>(`${this.baseURL}/session/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error retrieving session');
    }
  }

  async getUser(username: string): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.get<User>(`${this.baseURL}/user/${username}`);
      console.log("res",response)
      
      return response.data;
    } catch (error) {
      throw new Error('Error retrieving user');
    }
  }
}



export const api = new API(import.meta.env.VITE_BACKEND_URL)

console.log(async () => {
  await api.getUser('John Doe')
})