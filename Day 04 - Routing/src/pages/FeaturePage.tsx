import type { NavigationItem } from "../data/navigation";
import "./FeaturePage.css";

export default function FeaturePage({ feature }: { feature: NavigationItem }) {
  return <section className="feature-page"><div className="feature-page__badge">WEB3LEARN</div><h1>{feature.label}</h1><p>{feature.description}</p><div className="feature-page__empty"><span>◈</span><h2>Nội dung đang được phát triển</h2><p>Route <code>{feature.path}</code> đã hoạt động và sẵn sàng để bổ sung chức năng.</p></div></section>;
}
