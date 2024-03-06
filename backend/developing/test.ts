import {DB} from "../src/db_repo"




let db = new DB()



db.addSession(7, {
  creation_date: new Date(), BaseSnapshotData: {
  tabs: [{tab_id_given_from_chrome_api:1,url:"hihi",title:"haha"}]
}})