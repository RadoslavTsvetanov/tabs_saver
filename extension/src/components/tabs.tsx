/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Tab, Session } from "../models/Users";
import { UserContext } from "../utils/constext";
import { TabManager } from "../utils/tabs";
import { Loading } from "./loading";
import { Button } from "./simple_button";
import { storageFunctions } from "../utils/webStorage";
import { Chnage } from "./change";
import { SessionRestorer } from "../utils/sessionRestorer";
import { api } from "../utils/api"
export const TabComponent: React.FC<{ tab: Tab }> = ({ tab }) => {
  return (
    <div className="border border-gray-400 rounded p-4 m-2 shadow-md hover:shadow-lg">
      <p className="font-bold text-lg">TITLE: {tab.title}</p>
      <p className="text-blue-500">URL: {tab.url}</p>
      <Button text="Open Tab" on_click={() => {
        TabManager.openTab(tab.url);
      }} />

    </div>
  );
};

const SessionComponent: React.FC<{ session: Session }> = ({ session }) => {
  const user = useContext(UserContext);
  const [isCollapsed, setIsCollapsed] = useState(true); // State to track collapsed state

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="border border-gray-400 rounded p-4 m-2 shadow-md">
      <div className="text-gray-600 mb-4">Created at: {new Date(session.creation_date).toLocaleString()} </div>
      {!isCollapsed && <>
        <div className="space-y-4">
          <p className="font-semibold">Base Snapshot:</p>
          {session.baseSnapshot.tabs.map((tab: Tab, index: number) => (
            <TabComponent key={index} tab={tab} />
          ))}
          <Button text="restore to base snapshot state" on_click={
            async () => {
              await SessionRestorer.restore_session_to_change(session, 0)
            }
          } />
          {
            session.changes.map((change) => {
              return <Chnage session={session} change={change} />
            })
          }
        </div>

      </>}
      <div className="flex space-x-4 mt-4">

        <button onClick={toggleCollapse} className="text-blue-500 hover:underline">
          {isCollapsed ? 'Show Changes' : 'Hide Changes'}
        </button>

        {/**just to divide the custom components */}
        <Button
          on_click={async () => {
            await SessionRestorer.restore_session_to_change(session, session.changes.length > 0 ? session.changes[session.changes.length - 1].id : 0)
          }}
          text="Restore browser to latest state of the session"
        />
        <Button
          on_click={async () => {
            await storageFunctions.current_session.set(session.id);
            console.log("Session: ", user.currentSession);
          }}
          text="Set as current session"
        />
      </div>

    </div>
  );
};

export const TabsWrapperComponent: React.FC<{ username: string }> = ({ username }) => {
  const [global, setGlobal] = useState<{ sessions: Session[] | undefined, trigger_reload: number }>({
    sessions: undefined,
    trigger_reload: 0
  });

  const { currentSession } = useContext(UserContext);
function changeGlobal<V>(key: string, val: V) {
    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      [key]: val,
    }));
  }
  useEffect(() => {
    console.log('useEffect', username);

    async function fetchData() {
      if (username !== undefined) {
        console.log("changing");
        const data = await api.getUser(username);
        console.log("sessions->",data)
        changeGlobal("sessions",data.sessions)
      }
    }

    fetchData();

  }, [username]); 

  // useEffect(() => {
  //   if (!(currentSession === undefined || currentSession === -1)) {
  //     setGlobal(prevGlobal => ({
  //       ...prevGlobal,
  //       sessions: prevGlobal.sessions?.filter((session) => session.id !== currentSession)
  //     }));
  //   }
  // }, [currentSession]); 

  return (
    <div className="flex flex-wrap">
      {global.sessions !== undefined ? (
        global.sessions.map((session, index) => {
          if(session.id === currentSession){
            return <></>
          }
          return <SessionComponent key={index} session={session} />
})
      ) : (
          <>
            <Loading text="sessions" />
            <Button text="reload" on_click={() => {
              setGlobal(prevGlobal => ({ ...prevGlobal, trigger_reload: prevGlobal.trigger_reload + 1 }));
            }} />
          </>
        )}
    </div>
  );
};

export const CurrentSession: React.FC = () => {
  const [sessionData, setSessionData] = useState<Session | undefined>();
  const context = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      if (context.currentSession === undefined) {
        console.log("no session selected");
        return;
      }
      const data = await api.getSession(context.currentSession);
      console.log("api res", data);
      setSessionData(data.data);
    }
    fetchData();
  }, [context.currentSession, context]); // Re-run useEffect only when context.currentSession or context changes

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
          TabManager.logAllTabs();

          //TODO call API to create session and assign this id to the current session
        }}
      />
    </div>
  );
};
