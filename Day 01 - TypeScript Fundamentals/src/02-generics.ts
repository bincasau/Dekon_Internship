// ========================================
// PHẦN 1: GENERIC FUNCTION
// ========================================

// Generic <T> là một biến đại diện cho kiểu dữ liệu. Khi gọi hàm,
// TypeScript sẽ tự suy luận T từ đối số: chuỗi -> string, số -> number,...
function identity<T>(value: T) {
  console.log("Type of value:", typeof value);
}
identity("Hello");
identity(100);
identity(true);

// ========================================
// PHẦN 2: GENERIC ARRAY
// ========================================

// T[] là mảng có các phần tử cùng kiểu T. Nhờ generic, một hàm có thể
// xử lý nhiều loại mảng mà vẫn giữ được kiểm tra kiểu an toàn.
function logArray<T>(arr: T[]) {
  // item được TypeScript tự suy luận là T, không cần khai báo lại kiểu.
  arr.forEach((item) => {
    console.log("Type of item:", typeof item);
  });
}

logArray([1, 2, 3]);
logArray(["Alice", "Bob", "Charlie"]);
logArray([true, false, true]);

// ========================================
// PHẦN 3: GENERIC OBJECT
// ========================================

// Type User này sẽ được truyền làm đối số kiểu cho các generic bên dưới.
type User = {
  id: number;
  name: string;
};

// ========================================
// PHẦN 4: GENERIC INTERFACE
// ========================================

// Cấu trúc phản hồi API có success, còn kiểu của result thay đổi
// tùy dữ liệu API trả về. T giúp tái sử dụng interface cho nhiều loại result.
interface ApiResponse<T> {
  success: boolean;
  result: T;
}

// Truyền User vào T khiến response.result bắt buộc có cấu trúc của User.
const response: ApiResponse<User> = {
  success: true,
  result: {
    id: 1,
    name: "Phi",
  },
};

console.log(response);

// ========================================
// PHẦN 5: GENERIC CONSTRAINT
// ========================================

// extends { length: number } là generic constraint: T có thể là bất kỳ kiểu
// nào, miễn giá trị đó có thuộc tính length kiểu number (như string, array).
function printLength<T extends { length: number }>(value: T): void {
  console.log("Length:", value.length);
}

printLength("Hello");

printLength([1, 2, 3]);

printLength(["A", "B", "C"]);

// ========================================
// PHẦN 6: LAST ELEMENT
// ========================================

// Hàm trả về phần tử kiểu T. undefined được thêm vào kiểu trả về vì mảng
// có thể rỗng và khi đó không tồn tại phần tử cuối cùng.
function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

console.log(last([1, 2, 3]));

console.log(last(["A", "B", "C"]));

console.log(
  last([
    {
      id: 1,
      name: "Phi",
    },
    {
      id: 2,
      name: "Mai",
    },
  ]),
);

// ========================================
// PHẦN 7: WRAP
// ========================================

// TypeScript suy luận kiểu trả về là { value: T }, nên kiểu ban đầu của
// value vẫn được giữ lại sau khi đặt nó vào trong object.
function wrap<T>(value: T) {
  return { value };
}

console.log(wrap(10));

console.log(wrap("Hello"));

console.log(
  wrap({
    id: 1,
    name: "Phi",
  }),
);

// ========================================
// PHẦN 8: BOX
// ========================================

// Box là một "khuôn" object; kiểu của thuộc tính value được quyết định
// khi sử dụng, ví dụ Box<number>, Box<string> hoặc Box<User>.
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = {
  value: 100,
};

const stringBox: Box<string> = {
  value: "Hello",
};

const userBox: Box<User> = {
  value: {
    id: 1,
    name: "Phi",
  },
};

console.log(numberBox);
console.log(stringBox);
console.log(userBox);

// ========================================
// PHẦN 9: PAIR
// ========================================

// Generic có thể nhận nhiều tham số kiểu. T đại diện cho first, còn U
// đại diện cho second, và hai kiểu này không bắt buộc giống nhau.
interface Pair<T, U> {
  first: T;
  second: U;
}

const pair1: Pair<string, number> = {
  first: "Age",
  second: 21,
};

const pair2: Pair<User, boolean> = {
  first: {
    id: 1,
    name: "Phi",
  },
  second: true,
};

console.log(pair1);
console.log(pair2);

// ========================================
// CHALLENGE
// ========================================

// Hai tham số cùng mang kiểu T nên TypeScript bảo đảm chúng tương thích;
// kết quả là một mảng cũng chứa các phần tử thuộc kiểu T đó.
function makeArray<T>(item1: T, item2: T): T[] {
  return [item1, item2];
}

console.log(makeArray(1, 2));

console.log(makeArray("A", "B"));

console.log(
  makeArray(
    {
      id: 1,
      name: "Phi",
    },
    {
      id: 2,
      name: "An",
    },
  ),
);
