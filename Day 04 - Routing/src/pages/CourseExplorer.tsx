import { useCallback, useMemo, useState } from "react";
import { useRemoteCourses } from "../hooks/useRemoteCourses";
import { courseCategories } from "../data/courseExplorer";
import "./CourseExplorer.css";

export default function CourseExplorer() {
  const { courses, isLoading, error, refetch } = useRemoteCourses();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return courses.filter(
      (course) =>
        (category === "Tất cả" || course.category === category) &&
        (course.title.toLowerCase().includes(normalizedQuery) ||
          course.description.toLowerCase().includes(normalizedQuery)),
    );
  }, [courses, query, category]);

  const toggleSaved = useCallback((courseId: number) => {
    setSavedIds((currentIds) =>
      currentIds.includes(courseId)
        ? currentIds.filter((id) => id !== courseId)
        : [...currentIds, courseId],
    );
  }, []);

  return (
    <section className="explorer">
      <div className="explorer__hero">
        <div>
          <span>THƯ VIỆN WEB3</span>
          <h1>Khám phá khóa học mới</h1>
          <p>Dữ liệu được tải từ API và có thể tìm kiếm, lọc theo chủ đề.</p>
        </div>
        <strong>{savedIds.length} khóa học đã lưu</strong>
      </div>

      <div className="explorer__filters">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tìm theo tên hoặc nội dung..."
        />
        <div>
          {courseCategories.map((item) => (
            <button
              className={category === item ? "is-active" : ""}
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <p className="explorer__status">Đang tải khóa học...</p>}
      {error && (
        <div className="explorer__status explorer__status--error">
          <p>{error}</p>
          <button onClick={refetch}>Thử lại</button>
        </div>
      )}
      {!isLoading && !error && (
        <>
          <p className="explorer__result">Tìm thấy {filteredCourses.length} khóa học</p>
          <div className="explorer__grid">
            {filteredCourses.map((course) => {
              const isSaved = savedIds.includes(course.id);
              return (
                <article key={course.id}>
                  <span>{course.category}</span>
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                  <button className={isSaved ? "is-saved" : ""} onClick={() => toggleSaved(course.id)}>
                    {isSaved ? "✓ Đã lưu" : "+ Lưu khóa học"}
                  </button>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
