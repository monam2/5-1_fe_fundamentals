import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyReservations } from '@/features/my/api/getMyReservations';
import { reservationsQueryKeys } from '@/features/reservations/hooks/queries/querykeys';
import type { Reservation, ReservationsResponse } from '@/features/reservations/types';

export function useMyReservations() {
  return useSuspenseQuery<ReservationsResponse, Error, Reservation[]>({
    queryKey: reservationsQueryKeys.myReservations(),
    queryFn: getMyReservations,
    select: (response) => response.reservations,
  });
}
