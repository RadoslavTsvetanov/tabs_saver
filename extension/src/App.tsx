import React, { useContext, useState, useEffect } from 'react';
import { LoginForm, SignUpForm } from './components/auth';
import { storageFunctions } from './utils/webStorage';
import { CurrentSession, TabsWrapperComponent } from './components/tabs';
import { UserContext } from './utils/constext';
import { Button } from './components/simple_button';
import { Loading } from './components/loading';

const Main: React.FC = () => {
  const { username } = useContext(UserContext);
  const [debug_rloader,set_debug_reloader] = useState(0) // no real maening to the value type this state is purely for rerendering the component for debugging purposes
  return (
    <>
      <div className="flex flex-col items-center">
        
        <Button text={`reload: ${debug_rloader}`} on_click={() => {
          set_debug_reloader((prev) => {
            return prev + 1
          })
    }}/>
      <div className="flex">
          {username !== undefined ? <TabsWrapperComponent username={username} /> : <Loading text={ "no username "} />}
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
