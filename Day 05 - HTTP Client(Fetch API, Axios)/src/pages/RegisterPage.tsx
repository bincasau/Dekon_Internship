import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getApiError } from "../services/api";

export function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth(); const navigate = useNavigate();

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      setLoading(false);
      return;
    }
    try { await register({ displayName, email, password }); navigate("/dashboard"); }
    catch (err) { setError(getApiError(err)); } finally { setLoading(false); }
  }

  return <main className="auth-page"><form className="card auth-card" onSubmit={submit}>
    <h1>Create account</h1>
    <label>Full name<input value={displayName} onChange={e => setDisplayName(e.target.value)} required /></label>
    <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
    <label>Password<input type="password" minLength={8} value={password} onChange={e => setPassword(e.target.value)} required /></label>
    <label>Confirm password<input type="password" minLength={8} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required /></label>
    {error && <p className="error">{error}</p>}
    <button className="primary" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
    <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
  </form></main>;
}
