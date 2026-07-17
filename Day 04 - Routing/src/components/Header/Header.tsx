import "./Header.css";
import { Link } from "react-router-dom";
type Props = {
  userName: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  streak: number;
};
export default function Header({
  userName,
  searchValue,
  onSearchChange,
  streak,
}: Props) {
  return (
    <header className="header">
      <Link className="header__logo" to="/" aria-label="Về trang chủ Web3Learn">
        <i></i>
        <span>Web3</span>Learn
      </Link>
      <label className="header__search">
        <span>⌕</span>
        <input
          placeholder="Tìm kiếm bài học, chủ đề..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <kbd>Ctrl K</kbd>
      </label>
      <div className="header__tools">
        <div className="header__streak">🔥 {streak} ngày</div>
        {/* <button className="header__bell"></button> */}
        <div className="header__avatar"></div>
        <div className="header__profile">
          <strong>{userName}</strong>
          <small>Học viên</small>
        </div>
      </div>
    </header>
  );
}
