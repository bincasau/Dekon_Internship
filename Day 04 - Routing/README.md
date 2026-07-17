# Web3Learn Dashboard

## Các cập nhật so với phiên bản ban đầu

Phiên bản hiện tại đã được mở rộng từ dashboard React cơ bản thành ứng dụng có quản lý state, gọi API, custom hooks và routing nhiều cấp.

### `useState`

- Quản lý từ khóa tìm kiếm, khóa học đang chọn, khóa học phổ biến đang chọn và learning streak tại `DashboardPage.tsx` và `AppLayout.tsx`.
- Quản lý từ khóa, danh mục lọc và danh sách khóa học đã lưu tại `CourseExplorer.tsx`.
- Quản lý tiêu đề, chủ đề, nội dung và lỗi validation của form tạo ghi chú tại `NotebookPage.tsx`.
- Quản lý dữ liệu khóa học từ API và dữ liệu ghi chú trong các custom hooks.

### `useEffect`

- Gọi API JSONPlaceholder để lấy danh sách khóa học trong `useRemoteCourses.ts`.
- Sử dụng `AbortController` để hủy API request khi component unmount hoặc người dùng rời trang.
- Đồng bộ danh sách ghi chú vào `localStorage` trong `useNotebookNotes.ts`, giúp dữ liệu vẫn còn sau khi tải lại trang.

### `useMemo`

- Ghi nhớ danh sách khóa học sau khi tìm kiếm tại `DashboardPage.tsx`.
- Ghi nhớ kết quả tìm kiếm và lọc theo danh mục tại `CourseExplorer.tsx`.
- Danh sách chỉ được tính lại khi dữ liệu hoặc điều kiện lọc thay đổi.

### `useCallback`

- Ghi nhớ hàm lưu hoặc bỏ lưu khóa học trong `CourseExplorer.tsx`.
- Ghi nhớ hàm gọi lại API `refetch` trong `useRemoteCourses.ts`.
- Ghi nhớ hàm thêm ghi chú mới trong `useNotebookNotes.ts`.

### Custom Hooks

- `useRemoteCourses`: quản lý việc gọi API, trạng thái loading, error, dữ liệu khóa học và chức năng gọi lại API.
- `useNotebookNotes`: đọc ghi chú ban đầu, thêm ghi chú mới và tự động lưu dữ liệu vào `localStorage`.
- Custom hooks được đặt trong thư mục `src/hooks` để tách logic khỏi phần giao diện.

### Routing

- Bổ sung React Router với layout dùng chung gồm Header, Sidebar và `Outlet`.
- `App.tsx` chỉ chịu trách nhiệm khai báo route; giao diện dashboard đã được chuyển sang `DashboardPage.tsx`.
- Mỗi mục trên Sidebar có URL riêng và sử dụng `NavLink` để tự động hiển thị trạng thái active.
- Các route chính gồm `/`, `/courses`, `/learning-path`, `/practice`, `/ai-mentor`, `/quiz`, `/projects`, `/notebook`, `/community`, `/leaderboard` và `/certificates`.
- Bổ sung nested routing cho Sổ tay Web3:
  - `/notebook/all`: tất cả ghi chú.
  - `/notebook/favorites`: ghi chú yêu thích.
  - `/notebook/new`: tạo ghi chú mới.
  - `/notebook/:noteId`: xem chi tiết ghi chú bằng URL động.
- Sau khi tạo ghi chú, ứng dụng tự động chuyển đến URL chi tiết của ghi chú vừa tạo.

### Tổ chức lại source code

- Dữ liệu tĩnh được chuyển vào thư mục `src/data`.
- Logic tái sử dụng được chuyển vào `src/hooks`.
- Layout dùng chung được chuyển vào `src/layouts`.
- Nội dung từng màn hình được đặt trong `src/pages`.
- Bổ sung trang khám phá khóa học, gọi API, tìm kiếm, lọc và lưu khóa học.

Giao diện dashboard học Web3 được xây dựng trong **Day 02 – Project Setup (Vite) & React Fundamentals**.

Mục tiêu của project là thực hành các kiến thức React cơ bản:

- JSX
- Components
- Props
- State với `useState`
- Render danh sách với `map()`
- TypeScript type
- Tổ chức dữ liệu và assets
- CSS responsive

## Giao diện

Dashboard gồm các khu vực chính:

- Header với thanh tìm kiếm và thông tin học viên
- Sidebar điều hướng
- Welcome Banner
- Tiến độ học tập
- Lộ trình dành cho người học
- Danh sách khóa học phổ biến
- AI Mentor, ví Web3 và hoạt động gần đây

## Chức năng hiện có

- Tìm kiếm khóa học trong phần **Lộ trình dành cho bạn**
- Click khóa học trong lộ trình để cập nhật phần **Tiếp tục học**
- Click khóa học phổ biến để bắt đầu từ bài đầu tiên và hiển thị tiến độ 0%
- Đánh dấu card khóa học đang được chọn
- Điều hướng giữa các trang và tự động đổi trạng thái active của Sidebar
- Tăng số ngày streak khi click **Tiếp tục học** trên Welcome Banner
- Gọi API, tìm kiếm, lọc và lưu khóa học tại trang **Khóa học**
- Tạo và xem chi tiết ghi chú bằng nested route
- Lưu ghi chú vào `localStorage`
- Hiển thị giao diện responsive trên desktop, tablet và mobile

## State trong project

State được đặt tại page, layout hoặc custom hook phù hợp thay vì tập trung trong `App.tsx`:

| State                   | Mục đích                                           |
| ----------------------- | -------------------------------------------------- |
| `searchValue`           | Lưu nội dung ô tìm kiếm                            |
| `selectedCourse`        | Lưu khóa học đang hiển thị trong phần Tiếp tục học |
| `selectedPopularCourse` | Đánh dấu khóa học phổ biến đang được chọn          |
| `streak`                | Lưu số ngày học liên tiếp                          |
| `query`, `category`     | Tìm kiếm và lọc khóa học từ API                    |
| `savedIds`              | Lưu các khóa học được đánh dấu                     |
| `notes`                 | Quản lý danh sách ghi chú cá nhân                  |

## Công nghệ sử dụng

- React 19
- React Router
- TypeScript
- Vite
- CSS thuần
- JSONPlaceholder API
- Local Storage

## Cài đặt và chạy project

Yêu cầu máy đã cài đặt Node.js và npm.

```bash
npm install
npm run dev
```

Sau đó mở địa chỉ được Vite hiển thị trong terminal:

```text
http://localhost:3000
```

## Các câu lệnh

```bash
# Chạy môi trường phát triển
npm run dev

# Build production
npm run build

# Xem thử bản build
npm run preview
```

## Cấu trúc thư mục

```text
src/
├── assets/                  # Hình ảnh và icon local
├── components/
│   ├── CourseCard/          # Card lộ trình khóa học
│   ├── Header/              # Thanh điều hướng phía trên
│   ├── LearningProgress/    # Tiến độ học tập
│   ├── Sidedbar/            # Thanh điều hướng bên trái
│   └── WelcomeBanner/       # Banner chào mừng
├── data/
│   └── courses.ts           # Dữ liệu khóa học
├── types/
│   └── course.ts            # Type cho dữ liệu khóa học
├── App.tsx                  # Ghép các component thành dashboard
├── App.css                  # Layout và style dùng chung
├── PopularCourse.css        # Style card khóa học phổ biến
└── main.tsx                 # Điểm khởi chạy ứng dụng
```

## Dữ liệu khóa học

Dữ liệu được tách khỏi component và đặt trong `src/data/courses.ts`:

- `courses`: lộ trình dành cho người học
- `popularCourses`: các khóa học phổ biến

Kiểu dữ liệu tương ứng được định nghĩa trong `src/types/course.ts`.
