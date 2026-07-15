import type { Course } from "../../types/course";
import "./CourseCard.css";
type Props = {
  course: Course;
  index: number;
  isSelected: boolean;
  onSelect: (course: Course) => void;
};
export default function CourseCard({
  course,
  index,
  isSelected,
  onSelect,
}: Props) {
  const progress = (course.completedLessons / course.totalLessons) * 100;
  return (
    <article
      className={`course-card ${isSelected ? "course-card--selected" : ""}`}
      onClick={() => onSelect(course)}
    >
      <span className="course-card__number">{index}</span>
      <div className="course-card__icon">
        <img src={course.icon} alt={`${course.title} icon`} />
      </div>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="course-card__footer">
        <span>
          {course.completedLessons}/{course.totalLessons} bài học
        </span>
        <div>
          <i style={{ width: `${progress}%` }}></i>
        </div>
      </div>
    </article>
  );
}
