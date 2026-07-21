import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function NotFoundPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const homePath = isAuthenticated ? "/dashboard" : "/login";

  return (
    <main className="not-found-page">
      <section className="card not-found-card">
        <p className="not-found-code">404</p>
        <h1>Không tìm thấy trang</h1>
        <p>Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi.</p>
        <div className="not-found-actions">
          <Link className="primary" to={homePath}>
            {isAuthenticated ? "Về Dashboard" : "Về trang đăng nhập"}
          </Link>
          <button className="secondary" type="button" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        </div>
      </section>
    </main>
  );
}
