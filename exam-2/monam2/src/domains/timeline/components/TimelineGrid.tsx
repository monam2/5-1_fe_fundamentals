import { Link } from "wouter";
import { css } from "@emotion/react";

import useTimelineFilters, {
  filterRoomsByTimelineFilters,
} from "@/domains/timeline/hooks/useTimelineFilters";
import useRooms from "@/domains/timeline/hooks/useRooms";

import type { Room } from "@/shared/types";
import { If } from "@/shared/components/If";

export default function TimelineGrid() {
  const { data: rooms } = useRooms();
  const { filters } = useTimelineFilters();

  const filteredRooms = rooms
    ? filterRoomsByTimelineFilters(rooms, filters)
    : [];
  const hasFilteredRooms = filteredRooms.length > 0;

  return (
    <section
      css={css`
        margin-top: 32px;
      `}
    >
      <h2 css={sectionTitleStyle}>회의실 목록</h2>
      <div
        css={css`
          display: grid;
          gap: 12px;
          margin-top: 16px;
        `}
      >
        <If
          condition={hasFilteredRooms}
          isTrue={<RoomList rooms={filteredRooms} />}
          isFalse={<EmptyMessage />}
        />
      </div>
    </section>
  );
}

function RoomList({ rooms }: { rooms: Room[] }) {
  return rooms.map((room) => (
    <Link key={room.id} href={`/reservations/${room.id}`} css={linkStyle}>
      {room.name}
    </Link>
  ));
}

function EmptyMessage() {
  return (
    <p css={emptyTextStyle}>
      선택한 수용인원/장비 조건에 맞는 회의실이 없습니다.
    </p>
  );
}

const sectionTitleStyle = css`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
`;

const linkStyle = css`
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
`;

const emptyTextStyle = css`
  margin: 0;
  color: #6b7280;
  font-size: 0.9375rem;
`;
