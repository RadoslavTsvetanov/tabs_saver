import {Tab} from "../../../backend/src/models/Users"
function create_tab_object_for_api(tab: Tab) {
  return {
    id: tab.id,
    title: tab.title,
    url: tab.url,
  };
}



function logTabs(tabs: Tab[]) {
  // tabs.forEach((tab) => {
  //   console.log("Tab ID:", tab.id);a
  //   console.log("Title:", tab.title);
  //   console.log("URL:", tab.url);
  // });
  return tabs.map((tab) => {
    return create_tab_object_for_api(tab);
  });
}


export function log_all_tabs() { //TODO find how to eliminate this code duplication between the frontend and the backend
  chrome.tabs
    .query({})
    .then((tabs:chrome.tabs.Tab[]): void => {
      const formatted_tabs = logTabs(tabs as Tab[]);
      console.dir(formatted_tabs);
    })
    .catch((error) => {
      console.error("Error: !!!!!!!!!!!!!!!!!!!!!!", error);
    });
}