import { Timestamp } from "firebase/firestore";

export type Movie = {
  id: string;
  title: string;
  released_at: string;
  overview: string;
  duration: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
