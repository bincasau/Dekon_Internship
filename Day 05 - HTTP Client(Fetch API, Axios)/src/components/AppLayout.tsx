import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AppLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const avatar = user?.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" /> : user?.displayName.slice(0, 2).toUpperCase();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>FocusTodo</h2>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
        <div className="sidebar-user">
          <div className="avatar">{avatar}</div>
          <div><b>{user?.displayName}</b><small>{user?.email}</small></div>
        </div>
        <button className="secondary" onClick={handleLogout}>Log out</button>
      </aside>
      <main className="app-main">
        <header><h1>{title}</h1><div className="avatar">{avatar}</div></header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
