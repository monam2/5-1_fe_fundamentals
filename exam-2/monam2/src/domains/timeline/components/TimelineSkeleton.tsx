export default function TimelineSkeleton() {
  return (
    <section style={sectionStyle}>
      <div style={skeletonTitleStyle} />
      <div style={skeletonListStyle}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={skeletonCardStyle} />
        ))}
      </div>
    </section>
  );
}

const sectionStyle = {
  marginTop: "32px",
};

const skeletonTitleStyle = {
  width: "120px",
  height: "20px",
  borderRadius: "6px",
  backgroundColor: "#e5e7eb",
  animation: "pulse 1.5s ease-in-out infinite",
};

const skeletonListStyle = {
  display: "grid",
  gap: "12px",
  marginTop: "16px",
};

const skeletonCardStyle = {
  width: "200px",
  height: "36px",
  borderRadius: "6px",
  backgroundColor: "#e5e7eb",
  opacity: 0.7,
};
