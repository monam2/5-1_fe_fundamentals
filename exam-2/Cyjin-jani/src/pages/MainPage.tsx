import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { TimelineTable } from '@/features/reservations/components/TimelineTable';
import { formatLocalDate } from '@/lib/dateFormat';

export function MainPage() {
  const [selectedDate, setSelectedDate] = useState(() => formatLocalDate(new Date()));

  return (
    <main>
      <h1>타임라인</h1>
      <label htmlFor="timeline-date">
        날짜{' '}
        <input
          id="timeline-date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            resetKeys={[selectedDate]}
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
              <TimelineTable date={selectedDate} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </main>
  );
}
