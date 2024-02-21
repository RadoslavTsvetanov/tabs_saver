
export enum changes{
    CLOSED_TAB = "closedTab",
    CREATED_TAB = "createdTab",
    CHANGED_TAB = "changedTab",
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

export interface User{
    name: string,
    email: string,
    base_snapshot: Snapshot,
    changes: Change[]
}