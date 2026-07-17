import { useState, type FormEvent } from "react";
import { NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useNotebookNotes } from "../hooks/useNotebookNotes";
import type { NotebookNote } from "../data/notebook";
import "./NotebookPage.css";

export default function NotebookPage() {
  const notebook = useNotebookNotes();
  return (
    <section className="notebook-page">
      <div className="notebook-page__heading">
        <div>
          <span>SỔ TAY CÁ NHÂN</span>
          <h1>Sổ tay Web3</h1>
          <p>Ghi lại kiến thức và mở từng ghi chú bằng route con.</p>
        </div>
        <NavLink className="notebook-page__create" to="new">+ Tạo ghi chú</NavLink>
      </div>

      <nav className="notebook-page__tabs">
        <NavLink to="all" className={({ isActive }) => isActive ? "is-active" : ""}>Tất cả</NavLink>
        <NavLink to="favorites" className={({ isActive }) => isActive ? "is-active" : ""}>Yêu thích</NavLink>
      </nav>

      <Outlet context={notebook} />
    </section>
  );
}

export function NotebookList({ favorites = false }: { favorites?: boolean }) {
  const { notes } = useOutletContext<NotebookOutletContext>();
  const visibleNotes = notes.filter((note) => !favorites || note.favorite);

  return <div className="notebook-list">{visibleNotes.map((note) => <NavLink to={`/notebook/${note.id}`} key={note.id}><span>{note.topic}</span><h2>{note.title}</h2><p>{note.content}</p></NavLink>)}</div>;
}

export function NewNotePage() {
  const { addNote } = useOutletContext<NotebookOutletContext>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) { setError("Vui lòng nhập tiêu đề và nội dung ghi chú."); return; }
    const slug = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "note";
    const id = `${slug}-${Date.now()}`;
    addNote({ id, title: title.trim(), topic: topic.trim() || "Khác", content: content.trim(), favorite: false });
    navigate(`/notebook/${id}`);
  }

  return <form className="note-editor" onSubmit={handleSubmit}><h2>Tạo ghi chú mới</h2><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Tiêu đề ghi chú" /><input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Chủ đề (ví dụ: Solidity)" /><textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Nội dung bạn muốn ghi nhớ..." />{error && <p className="note-editor__error">{error}</p>}<button type="submit">Lưu ghi chú</button></form>;
}

export type NotebookOutletContext = { notes: NotebookNote[]; addNote: (note: NotebookNote) => void };
