import { useState, useEffect } from 'react';
import { LoginForm, SignUpForm } from './auth';
import { UserStorage } from './utils/webStorage';
import { log_all_tabs } from './utils/tabs';
function change_auth_page(change_function: () => void) {
  change_function()
}
const Main: React.FC = (() => {
  const [global, setGlobal] = useState<{ name: string | undefined }>({
    name: undefined
  });

  function change_global<V>(key: string, val: V) {
    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      [key]: val
    }));
  }


  useEffect(() => {

    async () => {
      const name = await UserStorage.get_username()
      change_global<string>("name",name)
    }
  },[])

  return <>
    <div>{ global?.name ? global.name :"Loading..." }</div>
    <button onClick={ log_all_tabs}></button>
  </>


})


function App() {
  const [username, setUsername] = useState<string | undefined | null>(undefined);
  const [global, setGlobal] = useState<{ is_login_selected: boolean }>({
    is_login_selected: true
  });

  function change_global<V>(key: string, val: V) {
    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      [key]: val
    }));
  }

  useEffect(() => {
    const fetchData = async () => {
      const name = await UserStorage.get_username()
      setUsername(name);
    };

    fetchData();

    change_global<boolean>('is_login_selected', true);
  }, []);

  return (
    <>
      {username ? (
        <>
        
        <Main/>
        <div>{username}</div>
        </>
      ) : (
        <>
          {global['is_login_selected'] ? (
            <>
              <LoginForm
                  onSubmit={async (email: string | undefined ,username: string ) => {
                    console.log(email)

                    UserStorage.set_username(username).then(() => { setUsername(username)})

                    
                  }}
                  changePage={() => {
                    change_auth_page(() => { change_global("is_login_selected", false) })
                  }}
              />
            </>
          ) : (
            <>
              <SignUpForm
                    onSubmit={async (email: string | undefined, username: string) => {
                      console.log(email)
                      UserStorage.set_username(username).then(() => {
                        setUsername(username)
                      })
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
    </>
  );
}

export default App;
