import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../../data/navigation";

export default function Sidebar(){return <aside className="sidebar"><nav>{navigationItems.map(item=><NavLink key={item.path} to={item.path} end={item.path==="/"} className={({isActive})=>`sidebar__item ${isActive?"sidebar__item--active":""}`}><i></i><span>{item.label}</span>{item.label==="AI Mentor"&&<b>Beta</b>}</NavLink>)}</nav><div className="sidebar__progress"><p>Tiến độ học tập</p><div className="progress-ring"><strong>35%</strong><small>Hoàn thành</small></div><span>12 / 34 bài học</span><NavLink to="/learning-path">Xem tiến độ</NavLink></div><div className="theme-switch"><i></i><span>Chế độ tối</span><b></b></div></aside>}
