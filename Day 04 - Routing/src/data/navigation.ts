export type NavigationItem = { label: string; path: string; description: string };

export const navigationItems: NavigationItem[] = [
  { label: "Trang chủ", path: "/", description: "Tổng quan quá trình học Web3 của bạn." },
  { label: "Lộ trình học", path: "/learning-path", description: "Theo dõi từng cột mốc trong lộ trình Web3." },
  { label: "Khóa học", path: "/courses", description: "Khám phá và lưu các khóa học phù hợp." },
  { label: "Bài tập thực hành", path: "/practice", description: "Luyện tập kiến thức với các thử thách thực tế." },
  { label: "AI Mentor", path: "/ai-mentor", description: "Hỏi đáp và nhận gợi ý học tập từ AI Mentor." },
  { label: "Quiz", path: "/quiz", description: "Kiểm tra kiến thức qua các câu hỏi nhanh." },
  { label: "Dự án", path: "/projects", description: "Xây dựng dự án Web3 cho portfolio của bạn." },
  { label: "Sổ tay Web3", path: "/notebook", description: "Lưu lại thuật ngữ và ghi chú quan trọng." },
  { label: "Cộng đồng", path: "/community", description: "Trao đổi và học hỏi cùng cộng đồng Web3." },
  { label: "Bảng xếp hạng", path: "/leaderboard", description: "Xem thành tích của các học viên nổi bật." },
  { label: "Chứng chỉ NFT", path: "/certificates", description: "Quản lý chứng chỉ NFT bạn đã đạt được." },
];
