export interface Event {
  _id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
  createdAt: string;
  updatedAt: string;
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
