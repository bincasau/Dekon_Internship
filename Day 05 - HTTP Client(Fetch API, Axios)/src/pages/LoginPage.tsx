import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getApiError } from "../services/api";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      await login({ email, password });
      navigate(location.state?.from?.pathname ?? "/dashboard", { replace: true });
    } catch (err) { setError(getApiError(err)); } finally { setLoading(false); }
  }

  return <main className="auth-page"><form className="card auth-card" onSubmit={submit}>
    <h1>Welcome back</h1><p>Sign in to FocusTodo</p>
    <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
    <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
    {error && <p className="error">{error}</p>}
    <button className="primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
    <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
  </form></main>;
}
