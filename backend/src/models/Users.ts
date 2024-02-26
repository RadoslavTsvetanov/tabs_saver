
export enum changes{
    CLOSED_TAB = "closedTab",
    CREATED_TAB = "createdTab",
    CHANGED_TAB = "changedTab"
}

// types.ts

export interface User {
  id: number;
  is_premium: boolean;
  name: string;
  email?: string | null;
  sessions: Session[];
}

export interface Session {
  id: number;
  creation_date: Date;
  baseSnapshot: Snapshot;
  changes: Change[];
}

export interface Change {
  id: number;
  type_of_change: changes;
  tabId: number;
  sessionId: number;
  tab: Tab;
  session: Session;
}

export interface Tab {
  id: number;
  url: string;
  title: string;
}

export interface Snapshot {
  tabs: Tab[];
}
