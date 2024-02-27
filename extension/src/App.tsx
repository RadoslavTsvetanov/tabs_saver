import React, { useContext, useState, useEffect } from 'react';
import { LoginForm, SignUpForm } from './components/auth';
import { storageFunctions } from './utils/webStorage';
import { CurrentSession, TabsWrapperComponent } from './components/tabs';
import { UsernameContext } from './utils/constext'; 
function change_auth_page(change_function: () => void) {
  change_function();
}
const currentSession = "hihihaha"
const setCurrentSession = () => {}

const Main: React.FC = () => {
  const { username } = useContext(UsernameContext);
  
  return (
    <>
      <div className="text-xl text-center mt-4">{username ? username : "Loading..."}</div>
      <TabsWrapperComponent username={username ? username : undefined} />
      <CurrentSession/>
    </>
  );
};

function App() {
  const [global, setGlobal] = useState<{ is_login_selected: boolean }>({
    is_login_selected: true,
  });

  const [username, setUsername] = useState<string | undefined>(undefined);

  function change_global<V>(key: string, val: V) {
    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      [key]: val,
    }));
  }

  useEffect(() => {
    const fetchData = async () => {
      const name = await storageFunctions.username.get()
      setUsername(name);
    };

    fetchData();

    change_global<boolean>('is_login_selected', true);
  }, []);

  // Step 3: Provide the username and setUsername function through the context
  return (
    <UsernameContext.Provider value={{ username, setUsername,currentSession,setCurrentSession }}>
      {username ? (
        <>
          <Main />
        </>
      ) : (
        <>
          {global['is_login_selected'] ? (
            <>
              <LoginForm
                onSubmit={async (email: string | undefined, username: string) => {
                  console.log(email);

                  storageFunctions.username.set(username).then(() => {
                    setUsername(username);
                  });
                }}
                changePage={() => {
                  change_auth_page(() => {
                    change_global("is_login_selected", false);
                  });
                }}
              />
            </>
          ) : (
            <>
              <SignUpForm
                onSubmit={async (email: string | undefined, username: string) => {
                  console.log(email);
                  storageFunctions.username.set(username).then(() => {
                    setUsername(username);
                  });
                }}
                changePage={() => {
                  change_auth_page(() => {
                    change_global("is_login_selected", true);
                  });
                }}
              />
            </>
          )}
        </>
      )}
    </UsernameContext.Provider>
  );
}

export default App;
