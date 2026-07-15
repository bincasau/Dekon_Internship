import heroImage from "../../assets/hero.png";
import "./WelcomeBanner.css";
type Props = { userName: string; streak: number; onContinue: () => void };
export default function WelcomeBanner({ userName, streak, onContinue }: Props) {
  return (
    <section className="welcome-banner">
      <div className="welcome-banner__content">
        <p>Chào mừng trở lại, </p>
        <h2>{userName}</h2>
        <span>Hôm nay bạn muốn học gì mới?</span>
        <div>
          <button onClick={onContinue}>▷ &nbsp; Tiếp tục học</button>
          <button className="secondary">
            <i></i>Lộ trình của tôi
          </button>
        </div>
      </div>
      <img src={heroImage} alt="" />
      <div className="welcome-banner__streak">
        🔥 <b>{streak}</b>
        <small>Ngày liên tiếp</small>
      </div>
    </section>
  );
}
