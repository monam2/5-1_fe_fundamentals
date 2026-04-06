import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { ReservationForm } from '@/features/reservations/components/ReservationForm';

export function ReservationAddPage() {
  const [searchParams] = useSearchParams();

  const roomId = searchParams.get('roomId') ?? '';
  const date = searchParams.get('date') ?? '';
  const startTime = searchParams.get('startTime') ?? '';

  return (
    <main className="flex flex-col items-center w-full h-dvh max-w-[800px] mx-auto px-6 py-6 overflow-hidden ">
      <h1 className="my-4 text-2xl font-bold">예약 생성</h1>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                <p>데이터를 불러오지 못했습니다.</p>
                <button type="button" onClick={() => resetErrorBoundary()}>
                  다시 시도
                </button>
              </div>
            )}
          >
            <Suspense fallback={<p>로딩 중…</p>}>
              <ReservationForm
                defaultRoomId={roomId}
                defaultDate={date}
                defaultStartTime={startTime}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </main>
  );
}
