export interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  level: string;
  createdAt: string;
  ticketNumber: string;
}

export interface Prize {
  id: string;
  name: string;
  badge: string;
  description: string;
  details: string;
  imageIcon: string; // lucide icon name or type
  specs: string[];
}

export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  details: string;
}
