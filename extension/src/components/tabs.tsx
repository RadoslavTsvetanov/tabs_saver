/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Tab, Session } from "../../../backend/src/models/Users";
import { UsernameContext } from "../utils/constext";
import { TabManager } from "../utils/tabs";
import { testdata } from "../static_dev_data/session";
import { Loading } from "./loading";

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
  const username = useContext(UsernameContext);

  return (
    <div className="border p-4 m-2">
      <div>Created at: {session.creation_date.getTime()} </div>
      <div>
        Base Snapshot:
        {session.baseSnapshot.tabs.map((tab: Tab, index: number) => (
          <TabComponent key={index} tab={tab} />
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          console.log(`fetching req with id: ${session.id} and name: ${username}`);
        }}
      >
        Restore browser to this state
      </button>
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
    </div>
  );
};

export const CurrentSession: React.FC = () => {
  const [session_data, set_session_data] = useState<Session | undefined>();

  useEffect(() => {
    async () => {
      const data = testdata[0]; /*await api.get_session(name) */ //TODO
      set_session_data(data);
    };
  }, []);

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
