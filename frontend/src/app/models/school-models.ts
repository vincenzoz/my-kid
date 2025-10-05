
export type CommunicationsResponse = {
  communications: Communication[];
}

export type CreateSchoolCommunication = {
  title: string,
  description: string,
  event: boolean,
  eventTitle?: string,
  eventDate?: string,
}

export type ModifyCommunication = {
  title: string,
  description: string,
  important?: boolean
}

export type Communication = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  createdBy: string;
  important: boolean;
  read: boolean;
}

export type CommunicationFilter = {
  text?: string;
  onlyEvents?: boolean;
  selectedChip?: EventFilterChip;
  dateFrom?: Date;
  dateTo?: Date;
}

export type EventFilterChip = {
  label: string,
  type: EventSelectChip
}

export enum EventSelectChip {
  ALL,
  WITH_EVENT,
  WITHOUT_EVENT
}
