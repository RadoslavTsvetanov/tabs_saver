import React, { useContext, useState, useEffect } from 'react';
import { LoginForm, SignUpForm } from './components/auth';
import { storageFunctions } from './utils/webStorage';
import { CurrentSession, TabsWrapperComponent } from './components/tabs';
import { UserContext } from './utils/constext';


const Main: React.FC = () => {
  const { username } = useContext(UserContext);

  return (
    <>
     <div className="flex flex-col items-center">
      <div className="text-xl text-center mt-4">{username ? username : "Loading..."}</div>
      <div className="flex">
        <TabsWrapperComponent username={username ? username : undefined} />
        <CurrentSession />
      </div>
    </div>
    </>
  );
};

function App() {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [currentSession, setCurrentSession] = useState<number | undefined>(undefined);
  const [isLoginSelected, setIsLoginSelected] = useState<boolean>(true);

  useEffect(() => {
    console.log("momomomomomomomomomo",import.meta.env)
    const fetchData = async () => {
      const name = await storageFunctions.username.get();
      setUsername(name);

      const session = await storageFunctions.current_session.get();
      setCurrentSession(session);
    };

    fetchData();
  }, []);

  const handleLogin = async (_email: string | undefined, username: string) => {
    await storageFunctions.username.set(username);
    setUsername(username);
  };

  const handleSignup = async (_email: string | undefined, username: string) => {
    await storageFunctions.username.set(username);
    setUsername(username);
  };

  return (
    <UserContext.Provider value={{ username, setUsername, currentSession, setCurrentSession: async(val: number) => { await storageFunctions.current_session.set(val); setCurrentSession(val)} }}>
      {username ? (
        <Main />
      ) : (
        <>
          {isLoginSelected ? (
            <LoginForm
              onSubmit={handleLogin}
              changePage={() => setIsLoginSelected(false)}
            />
          ) : (
            <SignUpForm
              onSubmit={handleSignup}
              changePage={() => setIsLoginSelected(true)}
            />
          )}
        </>
      )}
    </UserContext.Provider>
  );
}

export default App;
