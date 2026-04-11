import { useRooms } from '@/features/rooms/hooks/queries/useRooms';
import { sortRoomsByFloorAndName } from '@/features/reservations/lib/timelineTableUtils';
import type { Equipment, Room } from '@/features/rooms/types';

interface UseFilteredRoomsParams {
  capacity?: number | null;
  equipment?: Equipment[];
}

export function useFilteredRooms({ capacity = null, equipment = [] }: UseFilteredRoomsParams): Room[] {
  const { data: rooms } = useRooms();

  const sorted = sortRoomsByFloorAndName(rooms);
  return sorted.filter((room) => {
    if (capacity !== null && room.capacity < capacity) return false;
    if (equipment.length > 0 && !equipment.every((e) => room.equipment.includes(e))) return false;
    return true;
  });
}
