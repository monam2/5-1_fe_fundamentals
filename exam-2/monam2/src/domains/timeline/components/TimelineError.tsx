import type { FallbackProps } from "react-error-boundary";

export default function TimelineError({ resetErrorBoundary }: FallbackProps) {
  return (
    <section style={errorStyle}>
      <p style={errorTitleStyle}>
        ⚠️ 데이터를 불러오는 중 오류가 발생했습니다.
      </p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </section>
  );
}

const errorStyle = {
  marginTop: "32px",
  padding: "24px",
  borderRadius: "8px",
  backgroundColor: "#fef2f2",
  border: "1px solid #fecaca",
  display: "flex",
  flexDirection: "column" as const,
  gap: "8px",
};

const errorTitleStyle = {
  margin: 0,
  fontWeight: 700,
  color: "#b91c1c",
};
