import { Session } from "../../../backend/src/models/Users";

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
const session2: Session = {
  id: 2,
  creation_date: new Date(),
  baseSnapshot: { tabs: [...tabsArray] }, // making a copy of the arr to not reference the arr
  changes: []
}
const session1: Session = {
    id: 1,
    creation_date: new Date(),
    baseSnapshot: { tabs: tabsArray },
    changes: []
}

export const testdata = [
  session1,
  session2
]