# Web3Learn Dashboard

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
- Chọn và đổi trạng thái active của menu Sidebar
- Tăng số ngày streak khi click **Tiếp tục học** trên Welcome Banner
- Hiển thị giao diện responsive trên desktop, tablet và mobile

## State trong project

Các state được quản lý tại `App.tsx` và truyền xuống component bằng props:

| State                   | Mục đích                                           |
| ----------------------- | -------------------------------------------------- |
| `activeMenu`            | Lưu menu Sidebar đang được chọn                    |
| `searchValue`           | Lưu nội dung ô tìm kiếm                            |
| `selectedCourse`        | Lưu khóa học đang hiển thị trong phần Tiếp tục học |
| `selectedPopularCourse` | Đánh dấu khóa học phổ biến đang được chọn          |
| `streak`                | Lưu số ngày học liên tiếp                          |

## Công nghệ sử dụng

- React 19
- TypeScript
- Vite
- CSS thuần

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
