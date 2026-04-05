import { useReservations } from '@/features/reservations/hooks/queries/useReservations';

export function TimelineTable({ date }: { date: string }) {
  const { data: reservations } = useReservations(date);

  return (
    <section>
      <p>해당 날짜 예약 {reservations.length}건</p>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((r) => (
            <li key={r.id}>
              {r.title} ({r.startTime}–{r.endTime})
            </li>
          ))}
        </ul>
      ) : (
        <p>예약이 없습니다.</p>
      )}
    </section>
  );
}
