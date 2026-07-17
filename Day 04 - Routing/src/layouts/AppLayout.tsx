import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidedbar/Sidebar";
import "../App.css";
import "../PopularCourse.css";

export type AppOutletContext = {
  searchValue: string;
  streak: number;
  increaseStreak: () => void;
};

export default function AppLayout() {
  const [searchValue, setSearchValue] = useState("");
  const [streak, setStreak] = useState(12);

  return (
    <div className="app">
      <Header userName="Huỳnh Tuấn Phi" searchValue={searchValue} onSearchChange={setSearchValue} streak={streak} />
      <div className="app__body">
        <Sidebar />
        <Outlet context={{ searchValue, streak, increaseStreak: () => setStreak((value) => value + 1) } satisfies AppOutletContext} />
      </div>
    </div>
  );
}
