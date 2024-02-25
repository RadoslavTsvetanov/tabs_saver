import React, { useContext, useState, useEffect } from 'react';
import { LoginForm, SignUpForm } from './components/auth';
import { UserStorage } from './utils/webStorage';
import { Tabs } from './components/tabs';
import { UsernameContext } from './utils/constext';

function change_auth_page(change_function: () => void) {
  change_function();
}

const Main: React.FC = () => {
  const { username } = useContext(UsernameContext);

  return (
    <>
      <div>{username ? username : "Loading..."}</div>
      <Tabs username={username ? username : undefined} />
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
      const name = await UserStorage.get_username();
      setUsername(name);
    };

    fetchData();

    change_global<boolean>('is_login_selected', true);
  }, []);

  // Step 3: Provide the username and setUsername function through the context
  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
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

                  UserStorage.set_username(username).then(() => {
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
                  UserStorage.set_username(username).then(() => {
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
