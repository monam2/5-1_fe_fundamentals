import { TIMELINE_HOURS } from '@/features/reservations/lib/timelineSlots';

export function TimelineTableHeader() {
  return (
    <thead>
      <tr>
        <th
          scope="col"
          className="sticky top-0 left-0 z-30 w-36 min-w-36 border-r border-r-slate-300 bg-slate-50 border-b border-slate-200 px-3 py-3 text-left text-xs font-semibold text-slate-600"
        >
          회의실
        </th>
        {TIMELINE_HOURS.map((hour) => (
          <th
            key={hour}
            scope="colgroup"
            colSpan={2}
            className="sticky top-0 z-20 bg-slate-50 border-b border-r border-slate-200 px-1 py-2 text-center text-sm font-semibold text-slate-800"
          >
            {hour}시
          </th>
        ))}
      </tr>
    </thead>
  );
}
