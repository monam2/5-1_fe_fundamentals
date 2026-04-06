import { useSearchParams } from 'react-router-dom';

export function ReservationAddPage() {
  const [searchParams] = useSearchParams();

  const roomId = searchParams.get('roomId') ?? '';
  const date = searchParams.get('date') ?? '';
  const startTime = searchParams.get('startTime') ?? '';

  return (
    <main>
      <h1>예약 생성</h1>
      <p>roomId: {roomId}</p>
      <p>date: {date}</p>
      <p>startTime: {startTime}</p>
    </main>
  );
}
