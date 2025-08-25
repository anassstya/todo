import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskPage from "./src/Pages/TaskPage";
import StatsPage from "./src/Pages/StatsPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<TaskPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
    );
}


