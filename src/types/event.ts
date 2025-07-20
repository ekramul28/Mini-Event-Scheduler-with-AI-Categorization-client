export interface Event {
  _id?: string;
  id?: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface CreateEventData {
  title: string;
  date: string;
  time: string;
  notes?: string;
}

export interface UpdateEventData {
  title?: string;
  date?: string;
  time?: string;
  notes?: string;
  archived?: boolean;
  category?: string;
}
