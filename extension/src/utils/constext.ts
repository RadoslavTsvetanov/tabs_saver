import { createContext } from "react";

export const UserContext = createContext<{
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentSession: number | undefined;
  setCurrentSession: (val: number) => Promise<void>;
}>({
  username: undefined,
  setUsername: () => {},
  currentSession: undefined,
  setCurrentSession: async () => {},
});
