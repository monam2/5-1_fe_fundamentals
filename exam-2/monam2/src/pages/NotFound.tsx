function NotFoundPage() {
  return (
    <main style={pageStyle}>
      <h1 style={titleStyle}>페이지를 찾을 수 없습니다.</h1>
      <p style={descriptionStyle}>요청한 경로를 찾을 수 없습니다.</p>
    </main>
  );
}

const pageStyle = {
  padding: '48px 24px',
};

const titleStyle = {
  margin: 0,
  fontSize: '2rem',
  fontWeight: 700,
};

const descriptionStyle = {
  marginTop: '12px',
  color: '#4b5563',
};

export default NotFoundPage;
