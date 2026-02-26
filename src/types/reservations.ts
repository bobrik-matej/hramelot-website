export interface Table {
  id: string;
  name: string;
  capacity: number;
}

export interface Reservation {
  id: string;
  title: string;
  startTime: string | Date;
  endTime: string | Date;
  tableId: string;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  table?: Table;
  user?: {
    id: string;
    name?: string | null;
    email: string;
  };
  gameSession?: {
    id: string;
    title: string;
    system?: string;
  } | null;
}
