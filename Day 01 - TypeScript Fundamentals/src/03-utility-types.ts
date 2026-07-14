// ========================================
// DỮ LIỆU GỐC
// ========================================

// User là type gốc. Các utility type bên dưới sẽ tạo ra type mới từ User
// mà không cần viết lại toàn bộ thuộc tính.
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  age?: number;
  isAdmin: boolean;
};

const user: User = {
  id: 1,
  name: "Phi",
  email: "phinew331@gmail.com",
  password: "123456",
  age: 21,
  isAdmin: false,
};

// ========================================
// PHẦN 1: PARTIAL
// ========================================

// Partial<T> biến tất cả thuộc tính của T thành không bắt buộc (?).
// Thường dùng cho dữ liệu cập nhật vì người dùng chỉ gửi các trường cần sửa.
type PartialUser = Partial<User>;

const partialUser: PartialUser = {
  name: "Phi",
  email: "",
};
console.log("Update User:", partialUser);

// ========================================
// PHẦN 2: REQUIRED
// ========================================

// Required<T> biến tất cả thuộc tính của T thành bắt buộc.
// Dù age là optional trong User, RequiredUser vẫn bắt buộc phải có age.
type RequiredUser = Required<User>;

const requiredUser: RequiredUser = {
  id: 1,
  name: "Phi",
  email: "phinew331@gmail.com",
  password: "123456",
  age: 21,
  isAdmin: false,
};
console.log("Required User:", requiredUser);

// ========================================
// PHẦN 3: READONLY
// ========================================

// Readonly<T> ngăn việc gán lại tất cả thuộc tính sau khi object được tạo.
// Utility này chỉ kiểm tra lúc compile, không tự đóng băng object ở runtime.
type ReadonlyUser = Readonly<User>;

const readonlyUser: ReadonlyUser = {
  id: 2,
  name: "Phi",
  email: "phideptrai@gmail.com",
  password: "abcdef",
  age: 25,
  isAdmin: false,
};

console.log("Readonly User:", readonlyUser);

// Bỏ comment hai dòng này sẽ gây lỗi vì thuộc tính là readonly.
// readonlyUser.name = "Huỳnh Tuấn Phi";
// readonlyUser.email = "Phimew331@gmail.com";

// ========================================
// PHẦN 4: PICK
// ========================================

// Pick<T, K> tạo type mới bằng cách chỉ chọn các thuộc tính K từ T.
// PickUser chỉ còn id, name và email.
type PickUser = Pick<User, "id" | "name" | "email">;

const pickUser: PickUser = {
  id: 3,
  name: "Phi",
  email: "",
};
console.log("Pick User:", pickUser);

// ========================================
// PHẦN 5: OMIT
// ========================================

// Omit<T, K> tạo type mới bằng cách giữ mọi thuộc tính của T, trừ K.
// Cách này hữu ích khi cần loại dữ liệu nhạy cảm như password khỏi kết quả.
type OmitUser = Omit<User, "password">;

const omitUser: OmitUser = {
  id: 4,
  name: "Phi",
  email: "",
  isAdmin: false,
};
console.log("Omit User:", omitUser);

// ========================================
// PHẦN 6: RECORD
// ========================================

type UserRole = "admin" | "user" | "guest";

// Record<K, V> tạo một object có key kiểu K và value kiểu V.
// Ở đây mỗi key là user ID (number), mỗi value phải là một UserRole hợp lệ.
type UserRecord = Record<number, UserRole>;

const roleMap: UserRecord = {
  1: "admin",
  2: "user",
  3: "guest",
};
console.log("Role Map:", roleMap);

// ========================================
// PHẦN 7: RETURN TYPE
// ========================================

function createUser(): User {
  return {
    id: Date.now(),
    name: "Phi",
    email: "phinew331@gmail.com",
    password: "123456",
    isAdmin: false,
  };
}

// typeof createUser lấy kiểu của hàm; ReturnType<...> lấy kiểu giá trị
// mà hàm đó trả về. Nếu kiểu trả về của hàm đổi, type này cũng đổi theo.
type CreateUserReturnType = ReturnType<typeof createUser>;

const newUser: CreateUserReturnType = {
  id: Date.now(),
  name: "Phi",
  email: "",
  password: "",
  isAdmin: false,
};
console.log("New User:", newUser);

// ========================================
// PHẦN 8: PARAMETERS
// ========================================

function updateUser(id: number, name: string, email: string): void {
  console.log(`Updating user with id ${id}: name=${name}, email=${email}`);
}

// Parameters<typeof fn> lấy kiểu các tham số của hàm dưới dạng tuple.
// Kết quả ở đây là [number, string, string] và giữ đúng thứ tự tham số.
type UpdateUserParams = Parameters<typeof updateUser>;

const updateUserParams: UpdateUserParams = [
  1,
  "John Doe",
  "john.doe@example.com",
];
// Spread tuple thành ba đối số tương ứng khi gọi hàm.
updateUser(...updateUserParams);

// ========================================
// PHẦN 9: EXCLUDE
// ========================================

type Status = "loading" | "success" | "error" | "idle";

// Exclude<Union, Members> loại các thành viên được chỉ định khỏi union.
// ActiveStatus vì thế không còn nhận giá trị "idle".
type ActiveStatus = Exclude<Status, "idle">;

const activeStatus: ActiveStatus = "loading";

console.log("Active Status:", activeStatus);

// const invalidStatus: ActiveStatus = "idle";

// ========================================
// PHẦN 10: EXTRACT
// ========================================

type MixedType = string | number | boolean | null;

// Extract<Union, Members> chỉ giữ các thành viên của union tương thích
// với Members. Đây là thao tác ngược ý nghĩa với Exclude.
type StringOrNumber = Extract<MixedType, string | number>;

const value1: StringOrNumber = "Hello";
const value2: StringOrNumber = 100;

console.log("Extract values:", value1, value2);

// const value3: StringOrNumber = true;

// ========================================
// PHẦN 11: NONNULLABLE
// ========================================

type MaybeUser = User | null | undefined;

// NonNullable<T> loại null và undefined khỏi T.
// Vì vậy ExistingUser lúc này tương đương với User.
type ExistingUser = NonNullable<MaybeUser>;

const existingUser: ExistingUser = {
  id: 5,
  name: "Phi",
  email: "phinew331@gmail.com",
  password: "123456",
  isAdmin: false,
};

console.log("Existing User:", existingUser);
