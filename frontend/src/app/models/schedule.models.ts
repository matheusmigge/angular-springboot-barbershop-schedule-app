import { Client } from "./client.models";

export interface Schedule {
  id: number;
  client: Client
  startAt: Date;
  endAt: Date;
}