/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Tab, Session } from "../../../backend/src/models/Users";
import { UserContext } from "../utils/constext";
import { TabManager } from "../utils/tabs";
import { testdata } from "../static_dev_data/session";
import { Loading } from "./loading";
import { Button } from "./simple_button"; 
import { storageFunctions } from "../utils/webStorage";
import { Chnage } from "./change";
export const TabComponent: React.FC<{ tab: Tab }> = ({ tab }) => {
  return (
    <div className="border border-gray-400 rounded p-4 m-2 shadow-md hover:shadow-lg">
      <p className="font-bold text-lg">TITLE: {tab.title}</p>
      <p className="text-blue-500">URL: {tab.url}</p>
      <Button text="Open Tab" on_click={() => {
TabManager.openTab(tab.url);
      }}/>

    </div>
  );
};

const SessionComponent: React.FC<{ session: Session }> = ({ session }) => {
  const user = useContext(UserContext);
  
  return (
    <div className="border border-gray-400 rounded p-4 m-2 shadow-md">
      <div className="text-gray-600 mb-4">Created at: {new Date(session.creation_date).toLocaleString()} </div>
      <div className="space-y-4">
        <p className="font-semibold">Base Snapshot:</p>
        {session.baseSnapshot.tabs.map((tab: Tab, index: number) => (
          <TabComponent key={index} tab={tab} />
        ))}
        {
          session.changes.map((change) => {
            return <Chnage session={session} change={change}/>
          })
        } 
      </div>
      <div className="flex space-x-4 mt-4">

        {/**just to divide the custom components */}
        <Button 
          on_click={() => {
            // console.log(`Fetching req with id: ${session.id} and name: ${user.username}`);
          }} 
          text="Restore browser to latest state of the session" 
        />
        <Button 
          on_click={async () => {
            (user.setCurrentSession != undefined ?   user.setCurrentSession(session.id) : console.error("implement set function for session"))
            await storageFunctions.current_session.set(session.id);
            console.log("Session: ", user.currentSession);
          }} 
          text="Set as current session"
        />
      </div>
    </div>
  );
};

export const TabsWrapperComponent: React.FC<{ username: string | undefined }> = ({ username }) => {
  const [global, setGlobal] = useState<{ sessions: Session[] | undefined }>({
    sessions: undefined,
  });

const {currentSession} = useContext(UserContext)
  function changeGlobal<V>(key: string, val: V) {
    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      [key]: val,
    }));
  }

  useEffect(() => {
    if (username !== undefined) {
      changeGlobal<Session[]>("sessions", testdata);
      if (!(currentSession === undefined || currentSession === -1)) {
  global.sessions = global.sessions?.filter((session) => session.id !== currentSession);
}

      console.dir("Sessions", global.sessions);
    }
  }, [currentSession,username]); //intentionally made so that global.sessions does not trigger unnecessary rerenders

  return (
    <div className="flex flex-wrap">
      {global.sessions !== undefined ? (
        global.sessions.map((session, index) => (
          <SessionComponent key={index} session={session} />
        ))
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
};

export const CurrentSession: React.FC = () => {
  const [sessionData, setSessionData] = useState<Session | undefined>();
  const context = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const data = testdata[context !== undefined && context.currentSession ? context.currentSession - 1 : 0]; /*await api.get_session(name) */ //TODO
      setSessionData(data);
    }
    fetchData();
  }, [context]);

  return (
    <>
      {sessionData !== undefined ? (
        <SessionComponent session={sessionData} />
      ) : (
        <Loading text={"Sessions"} />
      )}
    </>
  );
};

export const NewSession: React.FC = () => {
    return (
      <div className="mt-8">
        <Button 
          text={"Start new browser session"} 
          on_click={() => {
            TabManager.logAllTabs()

            //TODO call API to create session and assign this id to the current session 
          }}
        />
      </div>
    );
}
