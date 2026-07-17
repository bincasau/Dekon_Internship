import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CourseCard from "../components/CourseCard/CourseCard";
import LearningProgress from "../components/LearningProgress/LearningProgress";
import WelcomeBanner from "../components/WelcomeBanner/WelcomeBanner";
import { courses, popularCourses } from "../data/courses";
import { mentorSuggestions, recentActivities } from "../data/dashboard";
import type { AppOutletContext } from "../layouts/AppLayout";
import type { Course } from "../types/course";

export default function DashboardPage() {
  const { searchValue, streak, increaseStreak } = useOutletContext<AppOutletContext>();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(courses[1]);
  const [selectedPopularCourse, setSelectedPopularCourse] = useState<string | null>(null);
  const filteredCourses = useMemo(() => courses.filter((course) => course.title.toLowerCase().includes(searchValue.toLowerCase())), [searchValue]);

  return <>
    <main className="dashboard">
      <WelcomeBanner userName="Huỳnh Tuấn Phi" streak={streak} onContinue={increaseStreak} />
      <LearningProgress course={selectedCourse} />
      <section className="content-section">
        <div className="section-heading"><h2>Lộ trình dành cho bạn</h2><button>Xem tất cả</button></div>
        <div className="course-grid">{filteredCourses.map((course, index) => <CourseCard key={course.id} course={course} index={index + 1} isSelected={selectedCourse?.id === course.id} onSelect={(selected) => { setSelectedCourse(selected); setSelectedPopularCourse(null); }} />)}</div>
      </section>
      <section className="content-section popular-section">
        <div className="section-heading"><h2>Khóa học phổ biến</h2><button>Xem tất cả</button></div>
        <div className="popular-grid">{popularCourses.map((course, index) => <article className={`popular-card popular-card--${index + 1} ${selectedPopularCourse === course.title ? "popular-card--selected" : ""}`} key={course.title} onClick={() => { setSelectedPopularCourse(course.title); setSelectedCourse({ id: -(index + 1), title: course.title, description: `Khóa học ${course.tag} dành cho người mới`, completedLessons: 0, totalLessons: course.lessons, icon: course.image }); }}><div className="popular-card__image"><img src={course.image} alt={course.title} /></div><div className="popular-card__body"><span>{course.tag}</span><h3>{course.title}</h3><p>{course.lessons} bài học <b>♢ {course.rating} ★</b></p></div></article>)}</div>
      </section>
    </main>
    <aside className="right-panel">
      <section className="panel mentor"><div className="panel-title"><h2>AI Mentor</h2><span>Beta</span></div><div className="mentor__message">Xin chào! Tôi là AI Mentor của bạn.<br />Hôm nay bạn muốn tìm hiểu điều gì về Web3?</div><div className="mentor__suggestions">{mentorSuggestions.map((suggestion) => <button key={suggestion}>{suggestion}</button>)}</div><div className="mentor__input">Nhập câu hỏi của bạn... <button>➤</button></div></section>
      <section className="panel wallet"><div className="panel-title"><h2>Ví của bạn</h2><span className="connected">● Đã kết nối</span></div><div className="wallet__account"><div className="wallet__avatar" /><div><strong>Account 1</strong><small>0x71C...d8A9</small></div><em>Sepolia Testnet</em></div><h3>0.123 ETH</h3><p>$123.45 USD</p><div className="wallet__actions"><button>↥ Gửi</button><button>↧ Nhận</button><button>Khám phá</button></div></section>
      <section className="panel activity"><div className="panel-title"><h2>Hoạt động gần đây</h2></div>{recentActivities.map((activity, index) => <div className="activity__item" key={activity.title}><div className={`activity__icon activity__icon--${index}`} /><p>{activity.title}<small>{activity.time}</small></p></div>)}<button className="activity__all">Xem tất cả hoạt động</button></section>
    </aside>
  </>;
}
