// ========================================
// PHẦN 1: PRIMITIVE TYPES
// ========================================

// Type annotation (: string, : number, : boolean) quy định kiểu dữ liệu
// mà biến được phép lưu. TypeScript sẽ báo lỗi khi gán một giá trị sai kiểu.
let fullName: string = "Huỳnh Tuấn Phi";
let age: number = 21;
let height: number = 1.7;
let isGraduated: boolean = false;

// Các phép toán số học chỉ nên thực hiện trên những giá trị kiểu number.
let price: number = 1000;
let discount: number = 100;
let total: number = price - discount;

// typeof là toán tử của JavaScript, dùng để kiểm tra kiểu của giá trị khi chạy.
// Nó khác với type annotation vì annotation chỉ được TypeScript kiểm tra lúc compile.
console.log("Total price after discount:", total);
console.log("Type of fullName:", typeof fullName);
console.log("Type of age:", typeof age);
console.log("Type of height:", typeof height);
console.log("Type of isGraduated:", typeof isGraduated);
console.log("Type of price:", typeof price);
console.log("Type of discount:", typeof discount);
console.log("Type of total:", typeof total);

// ========================================
// PHẦN 2: OBJECT TYPES
// ========================================

// type tạo một tên đại diện cho cấu trúc của object.
// Mọi giá trị kiểu Person phải có đủ 3 thuộc tính với đúng kiểu bên dưới.
type Person = {
  id: number;
  name: string;
  age: number;
};

const person1: Person = {
  id: 1,
  name: "Huỳnh Tuấn Phi",
  age: 21,
};

console.log("Person 1:", person1);

// ========================================
// PHẦN 3: ARRAY TYPES
// ========================================

// Cú pháp T[] nghĩa là mảng chỉ chứa các phần tử có kiểu T.
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

// Có thể dùng type tự định nghĩa làm kiểu phần tử của mảng.
let persons: Person[] = [
  { id: 1, name: "Huỳnh Tuấn Phi", age: 21 },
  { id: 2, name: "Nguyễn Văn A", age: 25 },
  { id: 3, name: "Trần Thị B", age: 30 },
];
console.log("Persons:", persons);

// ========================================
// PHẦN 4: FUNCTION TYPES
// ========================================

// Kiểu được ghi sau mỗi tham số là kiểu đầu vào; : number sau dấu )
// là kiểu trả về. Hàm này bắt buộc nhận hai số và trả về một số.
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Alice"));
console.log(greet("Bob"));
console.log(greet("Charlie"));

// Kiểu trả về của hàm cũng có thể được mô tả trực tiếp bằng một object type.
function createUser(
  name: string,
  age: number,
): {
  name: string;
  age: number;
} {
  return { name, age };
}
let user = createUser("Alice", 25);
console.log("User:", user);

// ========================================
// PHẦN 5: UNION TYPES
// ========================================

// Union type (|) cho phép một biến nhận một trong nhiều kiểu đã khai báo.
let id: string | number = 0;
id = "123";
console.log("ID:", id);

// Literal union giới hạn giá trị vào đúng ba chuỗi bên dưới, giúp tránh typo.
type Status = "active" | "inactive" | "pending";
let userStatus: Status = "active";

console.log("User Status:", userStatus);

// ========================================
// PHẦN 6: OPTIONAL PROPERTIES
// ========================================

// Dấu ? cho biết thuộc tính không bắt buộc. Vì vậy description có thể
// là string hoặc không xuất hiện trong object.
type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

const product1: Product = {
  id: 1,
  name: "Laptop",
  price: 1000,
};

const product2: Product = {
  id: 2,
  name: "Smartphone",
  price: 500,
  description: "A high-end smartphone",
};

console.log("Product 1:", product1);
console.log("Product 2:", product2);

// ========================================
// BÀI CHALLENGE
// ========================================

// Type này mô tả thống nhất dữ liệu sản phẩm trong kho.
type InventoryProduct = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const inventoryProducts: InventoryProduct[] = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    stock: 10,
  },
  {
    id: 2,
    name: "Mouse",
    price: 25,
    stock: 100,
  },
];

function getProductName(product: InventoryProduct): string {
  return product.name;
}

// Biểu thức so sánh luôn trả về boolean (true hoặc false).
function isInStock(product: InventoryProduct): boolean {
  return product.stock > 0;
}

// Giá trị tồn kho = giá của một sản phẩm × số lượng còn trong kho.
function getTotalValue(product: InventoryProduct): number {
  return product.price * product.stock;
}

// for...of duyệt lần lượt từng object trong mảng; TypeScript tự suy luận
// biến product ở đây có kiểu InventoryProduct.
for (const product of inventoryProducts) {
  console.log("Product Name:", getProductName(product));
  console.log("Is In Stock:", isInStock(product));
  console.log("Total Value:", getTotalValue(product));
}
