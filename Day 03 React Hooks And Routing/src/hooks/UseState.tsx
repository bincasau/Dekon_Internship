import { useState } from "react";
// Lưu ý: Nếu bạn có tạo file CSS mới cho component này thì nhớ đổi tên ở đây nhé (ví dụ: "./UseState.css")
/**
 * Kiểu dữ liệu của một sinh viên.
 */
type Student = {
  id: number;
  name: string;
  age: number;
};

function UseState() {
  /**
   * State kiểu string.
   * Dùng để lưu tên đang nhập trong input.
   */
  const [name, setName] = useState<string>("");

  /**
   * State kiểu number.
   * Giá trị ban đầu là 0.
   */
  const [age, setAge] = useState<number>(0);

  /**
   * Lazy Initial State.
   *
   * React gọi function này khi khởi tạo state lần đầu.
   * Các lần component render lại sẽ không dùng function này
   * để tạo lại giá trị students.
   */

  const studentsInitialState = {
    id: 1,
    name: "Nguyễn Văn A",
    age: 20,
  };

  const [students, setStudents] = useState<Student[]>(() => [
    studentsInitialState,
  ]);

  /**
   * Hàm thêm sinh viên.
   */
  const handleAddStudent = () => {
    // Xóa khoảng trắng ở đầu và cuối tên.
    const trimmedName = name.trim();

    // Không thêm nếu tên rỗng.
    if (!trimmedName) {
      alert("Vui lòng nhập tên sinh viên.");
      return;
    }

    // Không thêm nếu tuổi nhỏ hơn hoặc bằng 0.
    if (age <= 0) {
      alert("Tuổi phải lớn hơn 0.");
      return;
    }

    // Tạo object sinh viên mới.
    const newStudent: Student = {
      id: Date.now(),
      name: trimmedName,
      age,
    };

    /**
     * Functional Update.
     *
     * prevStudents là danh sách sinh viên trước đó.
     * Tạo một mảng mới gồm:
     * - Các sinh viên cũ
     * - Sinh viên mới
     */
    setStudents((prevStudents) => [...prevStudents, newStudent]);

    // Reset input sau khi thêm thành công.
    setName("");
    setAge(0);
  };

  return (
    <div className="UseState">
      <h1>Student Management</h1>

      {/* Controlled input: giá trị input được quản lý bởi state name. */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      {/* Controlled input: giá trị input được quản lý bởi state age. */}
      <input
        type="number"
        placeholder="Age"
        min="1"
        value={age || ""}
        onChange={(event) => {
          /**
           * event.target.value luôn trả về string,
           * kể cả khi input có type="number".
           */
          const inputValue = event.target.value;

          /**
           * Khi input bị xóa hết, đặt tuổi về 0.
           * Nếu có giá trị thì chuyển từ string sang number.
           */
          setAge(inputValue === "" ? 0 : Number(inputValue));
        }}
      />

      <button onClick={handleAddStudent}>Add Student</button>

      <hr />

      <h2>Student List</h2>

      {/* Dùng map để render danh sách sinh viên. */}
      {students.map((student) => (
        <div key={student.id}>
          {student.name} - {student.age} years old
        </div>
      ))}
    </div>
  );
}

export default UseState;
