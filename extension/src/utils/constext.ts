import {createContext} from "react"
export const UserContext = createContext<{
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentSession: number | undefined;
  setCurrentSession: React.Dispatch<React.SetStateAction<number | undefined>>;
}>({ username: undefined, setUsername: () => { }, currentSession: undefined, setCurrentSession: () => { } }); 

//TODO make this to just accept an object schema and types to reduce code duplication