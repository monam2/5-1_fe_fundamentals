import {
  reservationsOverlappingSlot,
  parseTimeToMinutes,
  TIMELINE_SLOT_MINUTES,
  type TimeSlot,
} from '@/features/reservations/lib/timelineSlots';
import { cn } from '@/lib/utils';
import type { Reservation } from '@/features/reservations/types';

interface TimelineSlotCellProps {
  roomId: string;
  slot: TimeSlot;
  slotIndex: number;
  roomReservations: Reservation[];
  onReservationClick: (reservationId: string) => void;
  onEmptySlotClick: (roomId: string, slotLabel: string) => void;
}

export function TimelineSlotCell({
  roomId,
  slot,
  slotIndex,
  roomReservations,
  onReservationClick,
  onEmptySlotClick,
}: TimelineSlotCellProps) {
  const overlapping = reservationsOverlappingSlot(
    roomReservations,
    slot.startMinutes,
    slot.endMinutes,
  );
  const reservation = overlapping[0];

  const isReservationStart =
    reservation !== undefined && parseTimeToMinutes(reservation.startTime) === slot.startMinutes;
  const isOccupiedMiddle = overlapping.length > 0 && !isReservationStart;

  if (isOccupiedMiddle) return null;

  const colSpan = isReservationStart
    ? Math.round(
        (parseTimeToMinutes(reservation.endTime) - parseTimeToMinutes(reservation.startTime)) /
          TIMELINE_SLOT_MINUTES,
      )
    : 1;

  const isHalfHourBorder = slotIndex % 2 === 0;

  return (
    <td
      key={`${roomId}-${slot.startMinutes}`}
      colSpan={colSpan}
      className={cn(
        'max-w-17 min-w-17 border-b border-slate-100 px-1.5 py-2 align-top text-xs text-slate-700 cursor-pointer',
        isHalfHourBorder
          ? '[border-right-style:dashed] border-r border-slate-200'
          : 'border-r border-slate-200',
        isReservationStart ? 'bg-blue-300' : '',
      )}
      onClick={() =>
        isReservationStart
          ? onReservationClick(reservation.id)
          : onEmptySlotClick(roomId, slot.label)
      }
    >
      {isReservationStart && <span className="whitespace-nowrap">{reservation.title}</span>}
    </td>
  );
}
