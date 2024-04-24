import React from "react";
import { Routes, Route } from "react-router-dom";
import TodoBlock from "./components/TodoBlock";
import s from "./App.module.scss";

const App: React.FC = () => {
  return (
    <div className={s.app}>
      <div className={s.app_content}>
        <Routes>
          <Route path="/" element={<TodoBlock />} />
          <Route path="/deleted" element={<TodoBlock />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
