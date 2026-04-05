export interface Reservation {
  id: string;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  organizer: string;
  attendees: number;
  createdAt: string;
}

export interface ReservationsResponse {
  reservations: Reservation[];
}

export interface ReservationResponse {
  reservation: Reservation;
}
