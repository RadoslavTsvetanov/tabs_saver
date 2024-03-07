import {DB} from "../src/db_repo"
 enum changes{
    CLOSED_TAB = "closedTab",
    CREATED_TAB = "createdTab",
    CHANGED_TAB = "changedTab",
    TAKEN_NEW_SNAPSHOT = "newSnapshot"
}

let db = new DB()


let user
// db.addSession(1, {
//   creation_date: new Date(), BaseSnapshotData: {
//   tabs: [{tab_id_given_from_chrome_api:1,url:"hihi",title:"haha"}]
//   }
// }).then((data) => {
//   user = data;
// })


// db.getUser("hhuhuhuu").then((data) => {
//   console.log(data)
// // })

// if (user == null) {
//   user = {
//     id:1
//   }
// }



db.addChange(3,{type_of_change: changes.CHANGED_TAB,tab:{tab_id_given_from_chrome_api:1,title:"hoho",url:"jiji"}})



db.getSession(3).then((session) => {
  console.log(session)
})