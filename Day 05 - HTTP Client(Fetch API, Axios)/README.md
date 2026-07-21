# Day 05 — HTTP Client với React, TypeScript và Axios

Project này áp dụng kiến thức HTTP Client để kết nối frontend React với REST API Spring Boot. Ứng dụng mẫu là **FocusTodo**, hỗ trợ đăng ký, đăng nhập, quản lý công việc, cập nhật hồ sơ và upload avatar.

## Công nghệ sử dụng

- React 19 và TypeScript
- Vite
- Axios
- React Router
- Spring Boot REST API
- JWT access token và refresh token

## Kiến thức HTTP Client đã áp dụng

### 1. Tạo Axios instance dùng chung

Các request được tập trung trong `src/services/api.ts` thay vì gọi API trực tiếp trong component.

```ts
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081",
});
```

Cách tổ chức này giúp quản lý base URL, header, token và xử lý lỗi tại một nơi duy nhất.

### 2. Sử dụng các HTTP method

Project sử dụng các method REST phổ biến:

- `GET`: lấy danh sách todo.
- `POST`: đăng ký, đăng nhập, refresh token, tạo todo và upload ảnh.
- `PUT`: cập nhật toàn bộ thông tin todo hoặc hồ sơ.
- `PATCH`: thay đổi trạng thái hoàn thành của todo.
- `DELETE`: xóa todo hoặc avatar.

### 3. Gửi request body và đọc response

Dữ liệu form được chuyển thành object TypeScript và gửi trong request body. Response backend sử dụng cấu trúc chung:

```ts
interface ApiResponse<T> {
  timestamp: string;
  code: number;
  message: string;
  result: T;
}
```

Generic `T` giúp TypeScript xác định chính xác kiểu dữ liệu trả về cho từng API.

### 4. Request interceptor

Trước mỗi request cần xác thực, Axios interceptor đọc access token từ `localStorage` và tự động thêm header:

```http
Authorization: Bearer <access-token>
```

Component không cần tự gắn token cho từng request.

### 5. Response interceptor và refresh token

Khi backend trả về `401 Unauthorized`, response interceptor sẽ:

1. Lấy refresh token trong `localStorage`.
2. Gọi `POST /api/auth/refresh`.
3. Lưu access token và refresh token mới.
4. Gửi lại request đã thất bại.
5. Xóa phiên và chuyển về trang đăng nhập nếu refresh thất bại.

Project dùng chung một refresh promise để tránh gửi nhiều request refresh đồng thời.

### 6. Xử lý lỗi API

Hàm `getApiError()` xử lý Axios error và lấy message từ response backend. Nếu backend trả lỗi validation theo từng field, frontend hiển thị lỗi đầu tiên cho người dùng.

Các trạng thái giao diện cũng được quản lý riêng:

- `loading`: request đang thực hiện.
- `error`: request thất bại.
- `data`: dữ liệu nhận được khi request thành công.
- Empty state: request thành công nhưng không có dữ liệu.

### 7. Upload file bằng FormData

Avatar được upload bằng `multipart/form-data`:

```ts
const formData = new FormData();
formData.append("file", file);
api.post("/api/images", formData);
```

Axios instance không đặt cố định `Content-Type: application/json`, nhờ đó trình duyệt có thể tự tạo multipart boundary chính xác.

Frontend kiểm tra định dạng ảnh và giới hạn dung lượng 5 MB trước khi gửi.

### 8. Cấu hình API bằng biến môi trường

URL backend không được hard-code cho riêng môi trường deploy. Biến môi trường được khai báo trong `.env`:

```env
VITE_API_BASE_URL=http://localhost:8081
```

Khi deploy chỉ cần thay giá trị thành domain backend production rồi build lại frontend.

### 9. Cập nhật UI từ API response

Sau khi tạo, sửa, toggle hoặc xóa todo, React state được cập nhật trực tiếp từ response API. Trang không cần reload lại toàn bộ.

Dashboard còn áp dụng:

- Tải danh sách bằng `useEffect`.
- Tìm kiếm todo theo tiêu đề.
- Lọc todo theo trạng thái.
- Hiển thị loading, error và empty state.

### 10. Authentication Context và protected route

`AuthProvider` quản lý user và trạng thái đăng nhập dùng chung toàn ứng dụng. `ProtectedRoute` ngăn người dùng chưa đăng nhập truy cập Dashboard và Profile.

Thông tin phiên được lưu trong `localStorage`:

- `accessToken`
- `refreshToken`
- `user`

Khi logout, frontend gọi API thu hồi refresh token rồi xóa toàn bộ dữ liệu phiên cục bộ.

## Các API đã tích hợp

| Chức năng | Method | Endpoint |
| --- | --- | --- |
| Đăng ký | POST | `/api/auth/register` |
| Đăng nhập | POST | `/api/auth/login` |
| Làm mới token | POST | `/api/auth/refresh` |
| Đăng xuất | POST | `/api/auth/logout` |
| Lấy danh sách todo | GET | `/api/todos` |
| Tạo todo | POST | `/api/todos` |
| Cập nhật todo | PUT | `/api/todos/{id}` |
| Toggle todo | PATCH | `/api/todos/{id}/toggle` |
| Xóa todo | DELETE | `/api/todos/{id}` |
| Cập nhật hồ sơ | PUT | `/api/users/me` |
| Upload avatar | POST | `/api/images` |
| Xóa avatar | DELETE | `/api/images` |

## Chạy project

### 1. Cài dependencies

```bash
npm install
```

### 2. Cấu hình môi trường

Tạo `.env` từ `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8081
```

### 3. Chạy development server

```bash
npm run dev
```

Frontend mặc định chạy tại `http://localhost:5173`.

### 4. Kiểm tra source code

```bash
npm run lint
npm run build
```

## Cấu trúc chính

```text
src/
├── components/       # Layout và protected route
├── hooks/            # Auth Context
├── pages/            # Login, Register, Dashboard, Profile, Not Found
├── services/api.ts   # Axios instance, interceptor và các API service
├── types.ts          # Request/response TypeScript types
├── App.tsx           # Router
└── main.tsx          # Entry point
```

## Kết quả học được

Qua project này, mình đã thực hành luồng HTTP hoàn chỉnh từ React tới Spring Boot: tạo request có type, gửi dữ liệu và file, đọc response, quản lý JWT, tự refresh token, xử lý lỗi, bảo vệ route và đồng bộ dữ liệu API với giao diện.
