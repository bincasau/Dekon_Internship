import { Link, useOutletContext, useParams } from "react-router-dom";
import type { NotebookOutletContext } from "./NotebookPage";

export default function NoteDetailPage() {
  const { noteId } = useParams();
  const { notes } = useOutletContext<NotebookOutletContext>();
  const note = notes.find((item) => item.id === noteId);

  return <article className="note-detail"><Link to="/notebook/all">← Quay lại sổ tay</Link><span>{note?.topic ?? "CHI TIẾT GHI CHÚ"}</span><h2>{note?.title ?? "Không tìm thấy ghi chú"}</h2>{note && <p>{note.content}</p>}<small>URL hiện tại: /notebook/{noteId}</small></article>;
}
