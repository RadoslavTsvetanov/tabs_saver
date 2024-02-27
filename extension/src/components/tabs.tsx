/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Tab, Session } from "../../../backend/src/models/Users";
import { UserContext } from "../utils/constext";
import { TabManager } from "../utils/tabs";
import { testdata } from "../static_dev_data/session";
import { Loading } from "./loading";
import { Button } from "./simple_button"; 
import { storageFunctions } from "../utils/webStorage";
const TabComponent: React.FC<{ tab: Tab }> = ({ tab }) => {
  return (
    <div className="border p-4 m-2">
      <p className="font-bold">TITLE: {tab.title}</p>
      <p className="text-blue-500">URL: {tab.url}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          TabManager.openTab(tab.url);
        }}
      >
        Open tab
      </button>
    </div>
  );
};

const SessionComponent: React.FC<{ session: Session }> = ({ session }) => {
  const user = useContext(UserContext);

  return (
    <div className="border p-4 m-2">
      <div>Created at: {session.creation_date.getTime()} </div>
      <div>
        Base Snapshot:
        {session.baseSnapshot.tabs.map((tab: Tab, index: number) => (
          <TabComponent key={index} tab={tab} />
        ))}
      </div>
      <Button on_click={() => {
        console.log(`fetching req with id: ${session.id} and name: ${user.username}`);
      }} text="Retore browser to this state" />
      <Button on_click={async () => {
        user.setCurrentSession(session.id)
        await storageFunctions.current_session.set(session.id)
        console.log("session: ", user.currentSession)
      } } text="Set as current session"/>
    </div>
  );
};

export const TabsWrapperComponent: React.FC<{ username: string | undefined }> = ({ username }) => {
  const [global, setGlobal] = useState<{ sessions: Session[] | null }>({
    sessions: null,
  });

  function change_global<V>(key: string, val: V) {
    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      [key]: val,
    }));
  }

  useEffect(() => {
    console.log("username: ", username);
    if (username !== undefined) {
      console.log("sending api req", username);
      change_global<Session[]>("sessions", testdata);
      console.dir("sessions", global.sessions);
    }
  }, [username, global.sessions]);

  return (
    <div className="flex flex-wrap">
      {global.sessions !== null ? (
        global.sessions.map((session, index) => (
          <SessionComponent key={index} session={session} />
        ))
      ) : (
        <div>Loading ...</div>
      )}

      <NewSession/>
    </div>
  );
};

export const CurrentSession: React.FC = () => {
  const [session_data, set_session_data] = useState<Session | undefined>();
  const context = useContext(UserContext)
  useEffect(() => {
    async () => {
      const data = testdata[context !== undefined && context.currentSession ? context.currentSession : 0]; /*await api.get_session(name) */ //TODO
      set_session_data(data);
    };
  }, [context]);

  return (
    <>
      {session_data !== undefined ? (
        <SessionComponent session={session_data} />
      ) : (
        <Loading text={"sessions"} />
      )}
    </>
  );
};

export const NewSession: React.FC = () => {
    return <div>
      <Button text={"start new browser session"} on_click={() => {
        TabManager.logAllTabs()

        //TODO call api to create session and assign this id to the current session 
        }}/>
    </div>
}

