import { Change, Session } from "../models/Users";
import { Button } from "./simple_button";
import { TabComponent } from "./tabs";
import { SessionRestorer} from "../utils/sessionRestorer";


export const Chnage: React.FC<{ session: Session, change: Change }> = ({ session,change }) => {
    return <div>
        <div>Type of change: {change.type_of_change}</div>
        <TabComponent tab={change.tab} />
        <Button text={"restore browser state to this change"} on_click={() => {
            SessionRestorer.restore_session_to_change(session,change.tab.id)
        }} />
    </div>
}