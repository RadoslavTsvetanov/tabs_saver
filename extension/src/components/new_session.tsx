import { Button } from "./simple_button";
import { TabManager } from "../utils/tabs";
import { useState, useContext } from "react";
import { api } from "../utils/api";
import { Tab } from "../models/Users";
import { UserContext } from "../utils/constext";
export const NewSession: React.FC<{ userId: number }> = ({ userId }) => {
  const [is_form_toggled] = useState(false);
  const user = useContext(UserContext);
  return (
    <div className="mt-8">
      <Button
        text={"Start new browser session"}
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
        }}
      />
      {is_form_toggled ?? (
        <>
          <form></form>
        </>
      )}
    </div>
  );
};
