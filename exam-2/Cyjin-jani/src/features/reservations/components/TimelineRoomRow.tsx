import { TIMELINE_SLOTS } from '@/features/reservations/lib/timelineSlots';
import { TimelineSlotCell } from '@/features/reservations/components/TimelineSlotCell';
import type { Reservation } from '@/features/reservations/types';
import type { Room } from '@/features/rooms/types';

interface TimelineRoomRowProps {
  room: Room;
  roomReservations: Reservation[];
  onReservationClick: (reservationId: string) => void;
  onEmptySlotClick: (roomId: string, slotLabel: string) => void;
}

export function TimelineRoomRow({
  room,
  roomReservations,
  onReservationClick,
  onEmptySlotClick,
}: TimelineRoomRowProps) {
  return (
    <tr>
      <th
        scope="row"
        className="sticky left-0 z-10 w-36 min-w-36 border-r border-r-slate-300 border-b border-slate-100 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-800"
      >
        <span className="block">{room.name}</span>
        <span className="mt-[4px] block text-xs font-normal text-slate-500">{room.floor}F</span>
      </th>
      {TIMELINE_SLOTS.map((slot, index) => (
        <TimelineSlotCell
          key={`${room.id}-${slot.startMinutes}`}
          roomId={room.id}
          slot={slot}
          slotIndex={index}
          roomReservations={roomReservations}
          onReservationClick={onReservationClick}
          onEmptySlotClick={onEmptySlotClick}
        />
      ))}
    </tr>
  );
}
