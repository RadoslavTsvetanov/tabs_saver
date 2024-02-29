import { Session, Tab, changes } from "../../../backend/src/models/Users";
export function restore_to_current_change(session: Session, change_id: number) {
    const new_browser_state: Tab[] = [...session.baseSnapshot.tabs];

    console.log("change_id", change_id);


    console.log("browser state before")

    const changesSlice = session.changes.slice(0, change_id);

    changesSlice.forEach((change) => {
        switch (change.type_of_change) {
            case changes.CHANGED_TAB: {
                const newTab = { ...change.tab }
                const index_of_tab = new_browser_state.findIndex((tab) => tab.id === change.tab.id)
                new_browser_state[index_of_tab] = newTab
                break;
            }
            case changes.CLOSED_TAB: {
                const closedTabIndex = new_browser_state.findIndex(tab => tab.id === change.tab.id);
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

    console.dir("New browser state after restoring changes:", new_browser_state);
}