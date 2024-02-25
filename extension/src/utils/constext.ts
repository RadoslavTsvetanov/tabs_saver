import {createContext} from "react"
export const UsernameContext = createContext<{
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({ username: undefined, setUsername: () => {} });