
export type CommunicationsResponse = {
  communications: Communication[];
}

export type CreateSchoolCommunication = {
  title: string,
  description: string,
  important: boolean
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
  createdAt: string;
  createdBy: string;
  important: boolean;
  read: boolean;
}

export type CommunicationFilter = {
  text?: string;
  onlyEvents?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  important?: boolean;
}


