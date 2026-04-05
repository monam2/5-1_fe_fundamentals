import { css } from "@emotion/react";

import {
  TimelineGrid,
  TimelineFilter,
  TimelineSkeleton,
} from "@/domains/timeline/components";

import { AsyncBoundary } from "@/shared/components";
import { Container, Layout } from "@/shared/layout";

export default function TimelinePage() {
  return (
    <Layout>
      <Container>
        <TimelinePage.Header />
        <TimelineFilter />
        <AsyncBoundary suspenseFallback={<TimelineSkeleton />}>
          <TimelineGrid />
        </AsyncBoundary>
      </Container>
    </Layout>
  );
}

TimelinePage.Header = () => (
  <header css={headerStyle}>
    <span css={eyebrowStyle}>Timeline</span>
    <h1 css={titleStyle}>회의실 타임라인</h1>
    <p css={descriptionStyle}>
      날짜별 예약 현황, 회의실 필터, 예약 겹침 상태를 이 화면에서 보여주게
      됩니다.
    </p>
  </header>
);

const headerStyle = css`
  display: grid;
  gap: 8px;
`;

const eyebrowStyle = css`
  color: #2563eb;
  font-size: 0.875rem;
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
`;

const titleStyle = css`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
`;

const descriptionStyle = css`
  margin: 0;
  max-width: 48rem;
  color: #4b5563;
  lineheight: 1.6;
`;
