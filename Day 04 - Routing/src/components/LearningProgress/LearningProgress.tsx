import type { Course } from "../../types/course";
import "./LearningProgress.css";
type Props = { course: Course | null };
export default function LearningProgress({ course }: Props) {
  if (!course) return null;
  const progress = Math.round(
    (course.completedLessons / course.totalLessons) * 100,
  );
  const nextLesson = Math.min(
    course.completedLessons + 1,
    course.totalLessons,
  );
  return (
    <section className="learning-progress">
      <h2>Tiếp tục học</h2>
      <div className="learning-progress__body">
        <div className="learning-progress__thumb"></div>
        <div className="learning-progress__info">
          <strong>
            Bài {nextLesson}: {course.title}
          </strong>
          <span>{course.description}</span>
          <div>
            <i style={{ width: `${progress}%` }}></i>
          </div>
        </div>
        <b>{progress}%</b>
        <button>Tiếp tục</button>
      </div>
    </section>
  );
}
