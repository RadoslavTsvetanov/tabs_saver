import { Session,changes } from "../models/Users";

const tabsArray = [
  {
    id: 3,
    title: "ansible - Google Search",
    url: "https://www.google.com/search?client=firefox-b-d&q=ansible"
  },
  {
    id: 4,
    title: "Senate Stock Watcher - Daily Summary for Today",
    url: "https://senatestockwatcher.com/"
  },
  {
    id: 5,
    title: "unofficial-chatgpt-api/server.py at main · taranjeet/unofficial-chatgpt-api",
    url: "https://github.com/taranjeet/unofficial-chatgpt-api/blob/main/server.py"
  },
  // Add more objects as needed
];

const session1: Session = {
    id: 1,
    creation_date: new Date(),
    baseSnapshot: { tabs: tabsArray },
    changes: []
}
setTimeout(() => {}, 1000 * 60) // ! FOR THE TIMESTAMS CREATED TO BE DIFFERENT  
const session2: Session = {
  id: 2,
  creation_date: new Date(),
    baseSnapshot: { tabs:[ ...tabsArray,{
    id: 5,
    title: "unofficial-chatgpt-api/server.py at main · taranjeet/unofficial-chatgpt-api",
    url: "https://github.com/taranjeet/unofficial-chatgpt-api/blob/main/server.py"
  } ] },
  changes: [{
    id: 1,
    type_of_change: changes.CREATED_TAB,
    tab: {
      id: 5,
      title: "hihi",
      url: "http://google.com"
    }
    }]
}

export const testdata = [
  session1,
  session2
]