/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect,useState,useContext } from "react";
import { Tab, Session } from "../../../backend/src/models/Users"
import { UsernameContext } from "../utils/constext";
import { TabManager } from "../utils/tabs";
import { testdata } from "../static_dev_data/session";
// import {Api} from "../utils/api"

const Tab: React.FC<{ tab: Tab }> = ({ tab }) => {
    
    return (
        <div>
                <p>TITLE: {tab.title}</p>
                <p>URL: {tab.url}</p>
                <button onClick={() => {
                    TabManager.openTab(tab.url)
                    }}>Open tab</button>
        </div>
  );
}



const Session: React.FC<{ session: Session }> = ({ session }) => {
    const username = useContext(UsernameContext)
    return <>
        <div>
            <div>Created at: {session.creation_date.getTime()} </div>
            <div>Base Snapshot: {session.baseSnapshot.tabs.map((tab: Tab) => {
                return (
                    <Tab tab={tab}/>
                )
            })}</div>
            <button onClick={() => {
                console.log(`fetching req with id: ${session.id} and name: ${username}`)
            }}>Restore browser to this state</button>
        </div>
    </>
}


export const Tabs: React.FC<{username: string | undefined}> = ({username}) => {
      const [global, setGlobal] = useState<{ sessions: Session[] | null }>({
          sessions: null
      });

  function change_global<V>(key: string, val: V) {
    setGlobal((prevGlobal) => ({
      ...prevGlobal,
      [key]: val
    }));
  }
    useEffect(() => {
        console.log("username: ", username)
        if (username !== undefined) {
            console.log("sending api req", username)
            change_global<Session[]>("sessions",testdata)
            console.dir("sessions", global.sessions)
        }
    },[username])
    return <>
        hihihihihihi
        {global.sessions !== null ? global.sessions.map((session) => {
            return <Session session={session}/>
         }) : "Loading ..."}
    </>
}