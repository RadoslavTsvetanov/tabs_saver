
export enum changes{
    CLOSED_TAB = "closedTab",
    CREATED_TAB = "createdTab",
    CHANGED_TAB = "changedTab",
    TAKEN_NEW_SNAPSHOT = "newSnapshot"
}


export interface Change{
    tab: Tab,
    type_of_change: changes
}


export interface Tab{
    url: string,
    id: number,
    title: string
}


export interface Snapshot{
    tabs: Tab[]
}

export interface Browser_session{ //TODO ask more experienced programmer if i should migrate this to a sql db since the data started to be a little bit more complex and overfetching the whole object will cause latency issues since 
    owner: string,
    name: string,
    base_snapshot: Snapshot,
    changes: Change[],
    creation_date: string

}

export interface User{
    name: string,
    email: string
}