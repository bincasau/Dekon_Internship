# Lộ trình tự code lại FocusTodo Frontend

## Mục tiêu

Tự xây lại frontend React + TypeScript, gọi Spring Boot tại `http://localhost:8081` bằng **Axios**. Không gọi API trực tiếp rải rác trong component.

## Quy tắc học

1. Chỉ làm một bước tại một thời điểm.
2. Sau mỗi bước chạy `npm run build` và `npm run lint`.
3. Hiểu dữ liệu đi từ API tới UI như thế nào trước khi viết CSS.
4. Mọi request HTTP đặt trong `src/services/api.ts`.

## Thứ tự thực hiện

### Bước 1 — Khai báo kiểu dữ liệu

Tạo `src/types.ts` trước vì các service và component đều phụ thuộc vào type.

Khai báo lần lượt:

- `ApiResponse<T>`
- `User`, `AuthResult`
- `LoginRequest`, `RegisterRequest`
- `Todo`, `TodoRequest`
- `ImageResult`
- `UpdateProfileRequest`

Kiểm tra response thật trong Swagger: `http://localhost:8081/swagger-ui.html`.

### Bước 2 — Cấu hình Axios

Tạo `src/services/api.ts`.

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8081",
});
```

Sau đó thêm request interceptor để đọc `accessToken` từ `localStorage` và gắn header `Authorization: Bearer ...`.

Không đặt cố định `Content-Type: application/json` trên instance vì upload ảnh cần `FormData`.

### Bước 3 — Viết từng nhóm API

Vẫn trong `src/services/api.ts`, viết theo thứ tự:

1. `authApi.register()`
2. `authApi.login()`
3. `authApi.logout()`
4. `todoApi.getAll()`
5. `todoApi.create()`
6. `todoApi.update()`
7. `todoApi.toggle()`
8. `todoApi.remove()`
9. `profileApi.update()`
10. `imageApi.upload()` và `imageApi.remove()`

Upload ảnh phải dùng Axios với `FormData`:

```ts
const formData = new FormData();
formData.append("file", file);
return api.post("/api/images", formData);
```

### Bước 4 — Làm Auth Context

Tạo `src/hooks/useAuth.tsx`.

Context quản lý:

- `user`
- `avatarUrl`
- `isAuthenticated`
- `login`, `register`, `logout`
- `updateUser`, `updateAvatar`

Login thành công mới lưu access token, refresh token và user. Logout phải xóa dữ liệu đăng nhập.

### Bước 5 — Cấu hình Router

Sửa `src/App.tsx`, thêm `BrowserRouter` trong `src/main.tsx` nếu cần.

Tạo route:

- `/login`
- `/register`
- `/dashboard`
- `/profile`

Tạo `src/components/ProtectedRoute.tsx` để chặn Dashboard và Profile khi chưa login.

### Bước 6 — Làm Login trước

Tạo `src/pages/LoginPage.tsx`.

Thứ tự xử lý submit:

1. `preventDefault()`
2. Xóa lỗi cũ
3. Bật loading
4. Gọi `login(email, password)`
5. Thành công thì chuyển tới Dashboard
6. Thất bại thì hiện message
7. `finally` tắt loading

Test login hoàn chỉnh trước khi làm trang khác.

### Bước 7 — Làm Register

Tạo `src/pages/RegisterPage.tsx`. Validate password và confirm password ở frontend, sau đó gọi register. Register thành công có thể login tự động.

### Bước 8 — Tạo App Layout

Tạo `src/components/AppLayout.tsx` gồm:

- Sidebar
- Navigation
- Thông tin user
- Avatar dùng chung
- Header
- Nút logout

Chưa cần Dark Mode hoặc Preferences.

### Bước 9 — Làm Dashboard và Todo

Tạo `src/pages/DashboardPage.tsx`.

Làm theo thứ tự:

1. Fetch danh sách trong `useEffect`
2. Hiện loading/error
3. Render danh sách
4. Thêm todo
5. Toggle hoàn thành
6. Sửa todo
7. Xóa todo
8. Thêm filter/search sau cùng

Sau mỗi mutation, cập nhật React state từ response API thay vì reload trang.

### Bước 10 — Làm Profile

Tạo `src/pages/ProfilePage.tsx`.

Form lưu:

- `displayName`
- `roleTitle`
- `bio`

Submit tới `PUT /api/users/me`, sau đó cập nhật Auth Context để sidebar đổi tên ngay.

### Bước 11 — Upload avatar

Trong Profile:

1. Tạo input `type="file"`
2. Chỉ nhận JPEG, PNG, WEBP, GIF
3. Giới hạn 5 MB
4. Gửi `FormData` bằng `imageApi.upload()`
5. Lấy URL từ response và cập nhật Auth Context
6. Sidebar, header và Profile cùng đọc một `avatarUrl`

Backend sẽ lưu URL Cloudinary vào user để logout/login không mất ảnh.

### Bước 12 — CSS và hoàn thiện

Chỉ sau khi chức năng chạy đúng mới chia CSS cho Login, Dashboard, Profile và responsive.

## Cấu trúc đích

```text
src/
├── components/
│   ├── AppLayout.tsx
│   └── ProtectedRoute.tsx
├── hooks/
│   └── useAuth.tsx
├── pages/
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── ProfilePage.tsx
│   └── RegisterPage.tsx
├── services/
│   └── api.ts
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── types.ts
```

## Lệnh kiểm tra

```bash
npm run dev
npm run build
npm run lint
```

Khi bắt đầu học cùng Codex, hãy yêu cầu: **“Hướng dẫn tôi làm bước 1, giải thích trước rồi để tôi tự code.”**
