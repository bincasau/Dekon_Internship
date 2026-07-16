import "./App.css";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import UseState from "./hooks/UseState";
import UseEffect from "./hooks/UseEffect";
import UseMemo from "./hooks/UseMemo";
import UseCallback from "./hooks/UseCallback";
import CustomHooks from "./hooks/CustomHooks";

function App() {
  return (
    <div className="App">
      <nav className="hook-tabs">
        <NavLink to="/use-state">useState</NavLink>
        <NavLink to="/use-effect">useEffect</NavLink>
        <NavLink to="/use-memo">useMemo</NavLink>
        <NavLink to="/use-callback">useCallback</NavLink>
        <NavLink to="/custom-hooks">Custom Hooks</NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/use-state" replace />} />
          <Route path="/use-state" element={<UseState />} />
          <Route path="/use-effect" element={<UseEffect />} />
          <Route path="/use-memo" element={<UseMemo />} />
          <Route path="/use-callback" element={<UseCallback />} />
          <Route path="/custom-hooks" element={<CustomHooks />} />
          <Route path="*" element={<Navigate to="/use-state" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
