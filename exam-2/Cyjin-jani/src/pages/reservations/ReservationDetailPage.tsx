import { useParams } from 'react-router-dom';

export function ReservationDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <main>
      <h1>예약 상세</h1>
      <p>예약 상세 페이지 : {id}</p>
    </main>
  );
}
