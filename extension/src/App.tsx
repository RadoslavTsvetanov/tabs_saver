import React, { useContext, useState, useEffect } from 'react';
import { LoginForm, SignUpForm } from './components/auth';
import { storageFunctions } from './utils/webStorage';
import { CurrentSession, TabsWrapperComponent } from './components/tabs';
import { UserContext } from './utils/constext'; 
function change_auth_page(change_function: () => void) {
  change_function();
}
const setCurrentSession = () => {}

const Main: React.FC = () => {
  const { username } = useContext(UserContext);
  
  return (
    <>
      <div className="text-xl text-center mt-4">{username ? username : "Loading..."}</div>
      <TabsWrapperComponent username={username ? username : undefined} />
      <CurrentSession/>
    </>
  );
};

function App() {
  const user = useContext(UserContext)
  const [global, setGlobal] = useState<{ is_login_selected: boolean, username: string | undefined, current_session: number | undefined}>({
    is_login_selected: true,
    username: user.username,
    current_session: user.currentSession
  });

(undefined);

  function change_global<V>(key: string, val: V) {
    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      [key]: val,
    }));
  }

  useEffect(() => {//TODO remodel so that the set flow isnt that confusing -> you set it both 14 lines above and now
    const fetchData = async () => {
      const name = await storageFunctions.username.get()
      change_global<string>("username",name)

      const session = await storageFunctions.current_session.get()
      change_global<number>("current_session",session)
    };

    fetchData();

    change_global<boolean>('is_login_selected', true);
  }, []);

  return (
    <UserContext.Provider value={{
      username: global.username, setUsername: (value) => {
        change_global("username",value)
      }, currentSession: global.current_session, setCurrentSession
    }}>
      {user.username ? (
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
                    user.setUsername(username);
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
                    user.setUsername(username);
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
    </UserContext.Provider>
  );
}

export default App;
