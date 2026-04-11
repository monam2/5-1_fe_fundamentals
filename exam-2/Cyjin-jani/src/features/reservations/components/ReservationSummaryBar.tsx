import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import { UserIcon } from 'lucide-react';

interface ReservationSummaryBarProps {
  date: string;
  totalReservationCount: number;
}

export function ReservationSummaryBar({ date, totalReservationCount }: ReservationSummaryBarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between w-full">
      <p className="mb-2 text-sm text-gray-600 self-start">
        {date} 예약된 회의실 : {totalReservationCount}건
      </p>
      <Button
        variant="outline"
        onClick={() => navigate('/my-reservations')}
        aria-label="내 예약 목록"
        className="mb-2"
      >
        <UserIcon className="h-4 w-4 shrink-0 text-muted-foreground" />내 예약 목록
      </Button>
    </div>
  );
}
