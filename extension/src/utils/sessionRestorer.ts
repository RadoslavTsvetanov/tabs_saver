import { TabManager } from "./tabs";
import { storageFunctions } from "./webStorage";
import { Session, Tab, changes } from "../models/Users";

export class SessionRestorer {
  private static construct_tab_list_to_change(
    session: Session,
    change_id: number
  ) {
    const new_browser_state: Tab[] = [...session.baseSnapshot.tabs];

    console.log("change_id", change_id);

    console.log("browser state before");
    const changesSlice = session.changes.slice(0, change_id);

    changesSlice.forEach((change) => {
      switch (change.type_of_change) {
        case changes.CHANGED_TAB: {
          const newTab = { ...change.tab };
          const index_of_tab = new_browser_state.findIndex(
            (tab) =>
              tab.tab_id_given_from_chrome_api ===
              change.tab.tab_id_given_from_chrome_api
          );
          new_browser_state[index_of_tab] = newTab;
          break;
        }
        case changes.CLOSED_TAB: {
          const closedTabIndex = new_browser_state.findIndex(
            (tab) =>
              tab.tab_id_given_from_chrome_api ===
              change.tab.tab_id_given_from_chrome_api
          );
          if (closedTabIndex !== -1) {
            new_browser_state.splice(closedTabIndex, 1);
          }
          break;
        }
        case changes.CREATED_TAB: {
          const createdTab = { ...change.tab };
          new_browser_state.push(createdTab);
          break;
        }
        default:
          // Handle unknown change types or do nothing
          break;
      }
    });

    console.dir(
      "New browser state after restoring changes:",
      new_browser_state
    );

    return new_browser_state;
  }

  static async restore_session_to_change(session: Session, change_id: number) {
    await storageFunctions.is_a_session_being_restored.set(true);

    this.construct_tab_list_to_change(session, change_id).forEach((tab) => {
      TabManager.openTab(tab.url);
    });

    await storageFunctions.is_a_session_being_restored.set(false);
  }
}
