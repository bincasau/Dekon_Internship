import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

function UseEffect() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [seconds, setSeconds] = useState(0);
  // UseEffect để fetch dữ liệu từ API khi component được mount lần đầu tiên.
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // UseEffect để log ra console khi search thay đổi.
  useEffect(() => {
    console.log("Search changed", search);
  }, [search]);

  // UseEffect để log ra console khi count hoặc search thay đổi.
  useEffect(() => {
    console.log("Data changed", count);
  }, [count, search]);

  // UseEffect để lắng nghe sự kiện resize của window.
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // UseEffect để tạo một timer đếm số giây kể từ khi component được mount.
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  // UseEffect để fetch dữ liệu từ API khi search thay đổi, với debounce 500ms.
  useEffect(() => {
    if (!search) return;

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${search}`,
          { signal: controller.signal },
        );
        const data = await res.json();
        console.log("Search results:", data);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.log(err);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return (
    <div>
      <h1>User Dashboard</h1>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>

      <h3>Timer: {seconds}</h3>
      <h3>Width: {width}</h3>

      <hr />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        users
          .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
          .map((u) => <p key={u.id}>{u.name}</p>)
      )}
    </div>
  );
}

export default UseEffect;
