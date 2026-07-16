import React, { useCallback, useMemo, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoItem = React.memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  console.log("TodoItem render:", todo.title);

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <span>
        {todo.title}
      </span>

      <button onClick={() => onDelete(todo.id)}>Xóa</button>
    </li>
  );
});

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoList = React.memo(function TodoList({
  todos,
  onToggle,
  onDelete,
}: TodoListProps) {
  console.log("TodoList render");

  if (todos.length === 0) {
    return <p>Không có công việc phù hợp.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
});

type FilterType = "all" | "active" | "completed";

export default function UseCallback() {
  const [input, setInput] = useState("");

  const [filter, setFilter] = useState<FilterType>("all");

  const [count, setCount] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "Học useCallback",
      completed: false,
    },
    {
      id: 2,
      title: "Học React.memo",
      completed: true,
    },
    {
      id: 3,
      title: "Làm bài tập React",
      completed: false,
    },
  ]);

  const increaseCount = useCallback(() => {
    setCount((previousCount) => previousCount + 1);
  }, []);

  const addTodo = useCallback(() => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: trimmedInput,
      completed: false,
    };

    setTodos((previousTodos) => [...previousTodos, newTodo]);

    setInput("");
  }, [input]);

  const toggleTodo = useCallback((id: number) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  }, []);

  const showCurrentFilter = useCallback(() => {
    alert(`Bộ lọc hiện tại: ${filter}`);
  }, [filter]);

  const filteredTodos = useMemo(() => {
    console.log("Đang lọc công việc...");

    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  const statistics = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length;

    return {
      total: todos.length,
      completed,
      active: todos.length - completed,
    };
  }, [todos]);

  return (
    <section>
      <h1>Todo App với useCallback</h1>

      <div>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addTodo();
            }
          }}
          placeholder="Nhập công việc..."
        />

        <button onClick={addTodo}>Thêm</button>
      </div>

      <div>
        <button onClick={() => setFilter("all")}>Tất cả</button>

        <button onClick={() => setFilter("active")}>Chưa hoàn thành</button>

        <button onClick={() => setFilter("completed")}>Đã hoàn thành</button>
      </div>

      <div>
        <p>Tổng số: {statistics.total}</p>
        <p>Chưa hoàn thành: {statistics.active}</p>
        <p>Đã hoàn thành: {statistics.completed}</p>
      </div>

      <hr />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <hr />

      <button onClick={increaseCount}>Tăng count: {count}</button>

      <button onClick={showCurrentFilter}>
        Xem bộ lọc
      </button>
    </section>
  );
}
