# Day 03 - React Hooks and Routing

Dự án thực hành React Hooks, TypeScript và điều hướng giữa các trang bằng React Router.

## Nội dung thực hành

### useState

- Khởi tạo và cập nhật state.
- Quản lý dữ liệu từ input.
- Render lại giao diện khi state thay đổi.

### useEffect

- Thực hiện side effect khi component được mount.
- Gọi API và hiển thị dữ liệu.
- Theo dõi sự thay đổi của dependencies.
- Xử lý debounce, timer và sự kiện resize.
- Cleanup effect khi component unmount.

### useMemo

- Ghi nhớ kết quả tính toán.
- Lọc và sắp xếp danh sách sản phẩm.
- Tính tổng giá sản phẩm.
- Hạn chế tính toán lại khi dependencies không thay đổi.

### useCallback

- Ghi nhớ function giữa các lần render.
- Kết hợp với `React.memo`.
- Thêm, xóa và cập nhật trạng thái công việc.
- Hạn chế component con render lại không cần thiết.

### Custom Hooks

- Xây dựng custom hook `useCounter`.
- Cấu hình giá trị ban đầu, giới hạn và bước nhảy.
- Tái sử dụng logic state trong component.

## Routing

Ứng dụng sử dụng `react-router-dom` để chuyển giữa các demo mà không tải lại trang.

| Demo | Đường dẫn |
| --- | --- |
| useState | `/use-state` |
| useEffect | `/use-effect` |
| useMemo | `/use-memo` |
| useCallback | `/use-callback` |
| Custom Hooks | `/custom-hooks` |

Các đường dẫn không hợp lệ sẽ tự động chuyển về `/use-state`.

## Công nghệ sử dụng

- React
- TypeScript
- Vite
- React Router
- ESLint

## Cài đặt và chạy dự án

Yêu cầu máy đã cài đặt Node.js và npm.

```bash
npm install
npm run dev
```

Sau đó mở địa chỉ được Vite hiển thị trong terminal, thông thường là:

```text
http://localhost:5173
```

## Các lệnh hữu ích

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Cấu trúc chính

```text
src/
├── hooks/
│   ├── UseState.tsx
│   ├── UseEffect.tsx
│   ├── UseMemo.tsx
│   ├── UseCallback.tsx
│   └── CustomHooks.tsx
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

`App.tsx` khai báo thanh điều hướng và các route. `main.tsx` bọc ứng dụng bằng `BrowserRouter`.
