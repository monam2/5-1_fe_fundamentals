import { useReservations } from '@/features/reservations/hooks/queries/useReservations';
import { groupReservationsByRoomId } from '@/features/reservations/lib/timelineTableUtils';
import { TimelineTableView } from '@/features/reservations/components/TimelineTableView';
import { useFilteredRooms } from '@/features/rooms/hooks/useFilteredRooms';
import type { Equipment } from '@/features/rooms/types';

interface TimelineTableContainerProps {
  date: string;
  capacity?: number | null;
  equipment?: Equipment[];
}

export function TimelineTableContainer({ date, capacity, equipment }: TimelineTableContainerProps) {
  const filteredRooms = useFilteredRooms({ capacity, equipment });
  const { data: reservations } = useReservations(date);

  const byRoom = groupReservationsByRoomId(reservations);

  return (
    <TimelineTableView
      date={date}
      filteredRooms={filteredRooms}
      byRoom={byRoom}
      totalReservationCount={reservations.length}
    />
  );
}
