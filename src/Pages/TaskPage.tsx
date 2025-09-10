import React, { useState } from "react";
import { Button, Col, Container, Row, Form, InputGroup } from "react-bootstrap";
import FormAdding from "../Components/FormAdding.tsx";
import search from "../assets/search.png";
import "../styles/App.scss";
import {useSelector} from "react-redux";
import TaskWrapper from "../Components/TaskWrapper.tsx";
import {Link} from "react-router-dom";
import type {RootState} from "../store.tsx";

export default function TaskPage() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => setShowForm(!showForm);

    const [filter, setFilter] = useState<"all"|"active"|"done">("all");
    const [sortBy, setSortBy] = useState<"dateCreated" | "priority" | "dueDate" | "alphabet">("dateCreated")

    const priorityClass = {
        low: 1,
        medium: 2,
        high: 3
    };

    const filteredTasks = tasks.filter(task => {
        if(filter === "active") return !task.done;
        if(filter === "done") return task.done;
        return true;
    })

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        switch (sortBy) {
            case "priority":
                return priorityClass[b.priority] - priorityClass[a.priority];
            case "dueDate":
                if (!a.date) return 1;
                if (!b.date) return -1;
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            case "alphabet":
                return a.name.localeCompare(b.name, "ru");
            case "dateCreated":
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // новые сверху
        }
    });

    return (
        <Container className="task-page my-5">
            <h1 className="task-page__slogan text-center">Управляй своими задачами</h1>
            <p className="task-page__sub-slogan text-center">
                Простой и удобный способ организовать свои дела
            </p>

            {showForm && (
                <div className="task-page__overlay">
                    <FormAdding onClose={() => setShowForm(false)} />
                </div>
            )}

            <Form className="task-page__form my-5 mx-3 mx-sm-5">
                <Row className="g-2 justify-content-center align-items-stretch">
                    <Col sm={12} md={6} lg={8} className="d-flex">
                        <InputGroup className="flex-grow-1">
                            <InputGroup.Text className="task-page__search-icon-wrapper">
                                <img
                                    src={search}
                                    alt="Поиск"
                                    className="task-page__search-icon"
                                />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Поиск задач"
                                className="task-page__search-input"
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={6} md={3} lg={2} className="d-flex">
                        <Link to="/stats" className="w-100">
                            <Button className="task-page__btn w-100">Статистика</Button>
                        </Link>
                    </Col>
                    <Col xs={6} md={3} lg={2} className="d-flex">
                        <Button className="task-page__btn w-100" onClick={toggleForm}>
                            Добавить задачу
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Form className="task-page__filters my-5 p-4 p-sm-5 mx-3 mx-sm-5">
                <Row className="gy-3">
                    <Col sm={12} lg={6} className="d-flex gap-2 align-items-center flex-wrap">
                        <p className="mb-0 task-page__filters-label">Фильтры:</p>
                        <Button
                            className={`task-page__filter-btn ${filter === "all" ? "task-page__filter-btn--active" : ""}`}
                            onClick={() => setFilter("all")}>
                            Все задачи
                        </Button>
                        <Button
                            className={`task-page__filter-btn ${filter === "active" ? "task-page__filter-btn--active" : ""}`}
                            onClick={() => setFilter("active")}>
                            Активные
                        </Button>
                        <Button
                            className={`task-page__filter-btn ${filter === "done" ? "task-page__filter-btn--active" : ""}`}
                            onClick={() => setFilter("done")}>
                            Выполненные
                        </Button>
                    </Col>
                    <Col sm={12} lg={6}>
                        <Form.Select
                            className="task-page__sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}>
                            <option value="dateCreated">По дате создания</option>
                            <option value="priority">По приоритету</option>
                            <option value="dueDate">По сроку</option>
                            <option value="alphabet">По алфавиту</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Form>

            {tasks.length === 0 ?
            <div className="task-page__adding d-flex flex-column align-items-center justify-content-center gap-2">
                    <div>
                        <Button className="task-page__btn--circle" onClick={toggleForm}>
                            +
                        </Button>
                        <h2 className="task-page__adding-title">Начните организовывать свою жизнь</h2>
                        <p className="task-page__adding-subtitle">
                            Добавьте первую задачу и начните путь к продуктивности
                        </p>
                    </div>
            </div>   : <TaskWrapper tasks={sortedTasks} />}
        </Container>
    );
}
