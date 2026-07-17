import { Route, Routes } from "react-router-dom";
import { navigationItems } from "./data/navigation";
import AppLayout from "./layouts/AppLayout";
import CourseExplorer from "./pages/CourseExplorer";
import DashboardPage from "./pages/DashboardPage";
import FeaturePage from "./pages/FeaturePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import NotebookPage, { NewNotePage, NotebookList } from "./pages/NotebookPage";

const standaloneFeatures = navigationItems.filter(
  (item) => !["/", "/courses", "/notebook"].includes(item.path),
);

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="courses" element={<CourseExplorer />} />
        <Route path="notebook" element={<NotebookPage />}>
          <Route index element={<NotebookList />} />
          <Route path="all" element={<NotebookList />} />
          <Route path="favorites" element={<NotebookList favorites />} />
          <Route path="new" element={<NewNotePage />} />
          <Route path=":noteId" element={<NoteDetailPage />} />
        </Route>
        {standaloneFeatures.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<FeaturePage feature={item} />}
          />
        ))}
        <Route
          path="*"
          element={
            <FeaturePage
              feature={{
                label: "Không tìm thấy trang",
                path: "404",
                description: "Đường dẫn này không tồn tại.",
              }}
            />
          }
        />
      </Route>
    </Routes>
  );
}
