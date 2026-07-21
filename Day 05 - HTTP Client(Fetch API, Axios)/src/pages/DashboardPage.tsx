import { useEffect, useState, type FormEvent } from "react";
import { AppLayout } from "../components/AppLayout";
import { getApiError, todoApi } from "../services/api";
import type { Category, Priority, Todo } from "../types";

export function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [category, setCategory] = useState<Category>("WORK");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | "ACTIVE" | "DONE">("ALL");

  useEffect(() => {
    todoApi.getAll()
      .then(r => setTodos(r.data.result))
      .catch(e => setError(getApiError(e)))
      .finally(() => setLoading(false));
  }, []);

  async function create(event: FormEvent) {
    event.preventDefault(); setError("");
    try { const todo = (await todoApi.create({ title, priority, category })).data.result; setTodos(current => [todo, ...current]); setTitle(""); }
    catch (e) { setError(getApiError(e)); }
  }
  async function toggle(id: string) {
    try { const todo = (await todoApi.toggle(id)).data.result; setTodos(current => current.map(item => item.id === id ? todo : item)); }
    catch (e) { setError(getApiError(e)); }
  }
  async function remove(id: string) {
    try { await todoApi.remove(id); setTodos(current => current.filter(item => item.id !== id)); }
    catch (e) { setError(getApiError(e)); }
  }

  async function edit(todo: Todo) {
    const updatedTitle = window.prompt("Tên công việc", todo.title)?.trim();
    if (!updatedTitle || updatedTitle === todo.title) return;
    try {
      const updated = (await todoApi.update(todo.id, {
        title: updatedTitle,
        description: todo.description,
        priority: todo.priority,
        category: todo.category,
        dueAt: todo.dueAt,
      })).data.result;
      setTodos(current => current.map(item => item.id === todo.id ? updated : item));
    } catch (e) { setError(getApiError(e)); }
  }

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.trim().toLowerCase());
    const matchesStatus = status === "ALL" || (status === "DONE" ? todo.completed : !todo.completed);
    return matchesQuery && matchesStatus;
  });

  return <AppLayout title="My Tasks">
    <form className="card todo-form" onSubmit={create}>
      <input placeholder="What needs to be done?" value={title} onChange={e => setTitle(e.target.value)} required />
      <select value={priority} onChange={e => setPriority(e.target.value as Priority)}><option>LOW</option><option>MEDIUM</option><option>HIGH</option></select>
      <select value={category} onChange={e => setCategory(e.target.value as Category)}><option>WORK</option><option>PERSONAL</option><option>STUDY</option><option>HEALTH</option><option>OTHER</option></select>
      <button className="primary">Add task</button>
    </form>
    {error && <p className="error">{error}</p>}
    <div className="card todo-form">
      <input aria-label="Tìm công việc" placeholder="Search tasks..." value={query} onChange={e => setQuery(e.target.value)} />
      <select aria-label="Lọc trạng thái" value={status} onChange={e => setStatus(e.target.value as typeof status)}>
        <option value="ALL">All</option><option value="ACTIVE">Active</option><option value="DONE">Completed</option>
      </select>
    </div>
    {loading && <p>Đang tải công việc...</p>}
    {!loading && visibleTodos.length === 0 && <p>Không có công việc phù hợp.</p>}
    <section className="todo-list">{visibleTodos.map(todo => <article className={`card todo ${todo.completed ? "done" : ""}`} key={todo.id}>
      <input type="checkbox" checked={todo.completed} onChange={() => toggle(todo.id)} />
      <div><h3>{todo.title}</h3><small>{todo.category} · {todo.priority}</small></div>
      <button className="secondary" onClick={() => edit(todo)}>Edit</button>
      <button className="danger" onClick={() => remove(todo.id)}>Delete</button>
    </article>)}</section>
  </AppLayout>;
}
