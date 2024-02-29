import { Change, Session } from "../../../backend/src/models/Users";
import { Button } from "./simple_button";
import { TabComponent } from "./tabs";
import { restore_to_current_change } from "../utils/sessionRestorer";


export const Chnage: React.FC<{ session: Session, change: Change }> = ({ session,change }) => {
    return <div>
        <div>Type of change: {change.type_of_change}</div>
        <TabComponent tab={change.tab} />
        <Button text={"restore browser state to this change"} on_click={() => {
            restore_to_current_change(session,change.tab.id)
        }} />
    </div>
}