import { Button } from "./simple_button";
import { TabManager } from "../utils/tabs";
import { useState, useContext } from "react";
import { api } from "../utils/api";
import { Tab } from "../models/Users";
import { UserContext } from "../utils/constext";
export const NewSession: React.FC<{ userId: number }> = ({ userId }) => {
  const [is_warning_showed, set_is_warnng_showed] = useState(false);
  const user = useContext(UserContext);
  console.log(is_warning_showed);
  return (
    <div className="mt-8">
      <Button
        text={"Start new browser session"}
        on_click={() => {
          console.log("clicking button");
          set_is_warnng_showed(true);
        }}
      />
      {is_warning_showed && (
        <div className="absolute top-1 right-1 bg-slate-600">
          <h1>
            Are you sure you want to create a new session, if you have more than
            5 the last one will be deleted automatically if you dont have a
            premium acc
          </h1>
          <Button
            on_click={async () => {
              const tabs = await TabManager.logAllTabs();
              console.log("user id -> ");
              const new_session = await api.addSessionToUser(userId, {
                creation_date: new Date(),
                baseSnapshot: {
                  tabs: tabs as Tab[],
                },

                // these bottom two are obsolete since backend created them by itself but its to satisfy the type definition
                id: 0,
                changes: [],
              });
              console.log("new session -> ", new_session);
              await user.setCurrentSession(new_session.id);
              set_is_warnng_showed(false);
            }}
            text="create new session"
          />

          <Button
            text="nope ont wanna get my things deleted "
            on_click={() => {
              set_is_warnng_showed(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
