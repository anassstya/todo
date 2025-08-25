import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskWrapper from "./TaskWrapper.tsx";
import { Form, Button } from "react-bootstrap";
import "../styles/App.scss";

export default function TaskByCategory() {
    const tasks = useSelector((state: any) => state.tasks.tasks);

    const categories: { [key: string]: typeof tasks } = {};
    const categoryNameMap: { [key: string]: string } = {};

    tasks.forEach((task: any) => {
        const catKey = task.category.trim().toLowerCase();
        if (!categories[catKey]) {
            categories[catKey] = [];
            categoryNameMap[catKey] = task.category;
        }
        categories[catKey].push(task);
    });

    const categoryKeys = Object.keys(categories);

    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const [visibleCount, setVisibleCount] = useState(6);

    const showMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setVisibleCount(6);
    };

    const displayedTasks = categories[selectedCategory]?.slice(0, visibleCount) || [];

    return (
        <div className="task-by-category">
            <Form.Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-5"
            >
                <option value="">Выберите категорию</option>
                {categoryKeys.map((key) => (
                    <option key={key} value={key}>
                        {categoryNameMap[key]}
                    </option>
                ))}
            </Form.Select>

            {selectedCategory && displayedTasks.length > 0 && (
                <>
                    <TaskWrapper tasks={displayedTasks} />

                    {visibleCount < categories[selectedCategory].length && (
                        <Button className="task-by-category__btn" onClick={showMore}>
                            Далее
                        </Button>
                    )}
                </>
            )}

            {selectedCategory && displayedTasks.length === 0 && (
                <p>В этой категории пока нет задач.</p>
            )}
        </div>
    );
}
