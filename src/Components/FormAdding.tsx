import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/App.scss";
import { useDispatch } from "react-redux";
import { addTask } from "../modules/tasksSlice.ts";

interface TaskForm {
    name: string;
    description?: string;
    priority: "low" | "medium" | "high";
    category: string;
    date?: string;
}

interface FormAddingProps {
    onClose: () => void;
}

interface FormErrors {
    name?: string;
    category?: string;
    date?: string;
}

export default function FormAdding({ onClose }: FormAddingProps) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<TaskForm["priority"]>("low");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const [errors, setErrors] = useState<FormErrors>({});

    const validateField = (field: keyof TaskForm, value: string) => {
        let error = "";

        switch (field) {
            case "name":
            case "category":
                if (!value.trim()) {
                    error = field === "name" ? "Название обязательно" : "Категория обязательна";
                } else if (!/^[A-Za-zА-Яа-яЁё]/.test(value)) {
                    error = field === "name"
                        ? "Название должно начинаться с буквы"
                        : "Категория должна начинаться с буквы";
                }
                break;
            case "date":
                if (value) {
                    const dateObj = new Date(value);
                    if (isNaN(dateObj.getTime())) {
                        error = "Некорректная дата";
                    } else {
                        const [year, month, day] = value.split("-").map(Number);
                        if (
                            dateObj.getFullYear() !== year ||
                            dateObj.getMonth() + 1 !== month ||
                            dateObj.getDate() !== day
                        ) {
                            error = "Несуществующая дата";
                        } else {
                            const today = new Date();
                            const maxDate = new Date();
                            maxDate.setFullYear(today.getFullYear() + 5);

                            today.setHours(0, 0, 0, 0);
                            dateObj.setHours(0, 0, 0, 0);

                            if (dateObj < today) {
                                error = "Дата не может быть в прошлом";
                            } else if (dateObj > maxDate) {
                                error = "Дата слишком далека";
                            }
                        }
                    }
                }
                break;
        }

        setErrors((prev) => ({ ...prev, [field]: error }));
        return error;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameError = validateField("name", name);
        const categoryError = validateField("category", category);
        const dateError = validateField("date", date);

        if (nameError || categoryError || dateError) return;

        const newTask: TaskForm = {
            name,
            description,
            priority,
            category,
            date,
        };

        dispatch(addTask(newTask));

        setName("");
        setDescription("");
        setPriority("low");
        setCategory("");
        setDate("");
        setErrors({});

        onClose();
    };

    return (
        <div className="form-adding">
            <button
                onClick={onClose}
                className="form-adding__close-btn"
                aria-label="Закрыть форму"
            >
                ×
            </button>

            <Form className="form-adding__body" onSubmit={handleSubmit}>
                <Form.Group className="form-adding__group" controlId="formName">
                    <Form.Label className="form-adding__label">Название *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Что нужно сделать?"
                        className="form-adding__input"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            validateField("name", e.target.value);
                        }}
                        isInvalid={!!errors.name}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-adding__group" controlId="formDescription">
                    <Form.Label className="form-adding__label">Описание</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Дополнительные детали..."
                        className="form-adding__input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="form-adding__group" controlId="formPriority">
                    <Form.Label className="form-adding__label">Приоритет</Form.Label>
                    <Form.Select
                        className="form-adding__select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as TaskForm["priority"])}
                    >
                        <option value="low">Низкий приоритет</option>
                        <option value="medium">Средний приоритет</option>
                        <option value="high">Высокий приоритет</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="form-adding__group" controlId="formCategory">
                    <Form.Label className="form-adding__label">Категория *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Работа, Личное, Покупки..."
                        className="form-adding__input"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            validateField("category", e.target.value);
                        }}
                        isInvalid={!!errors.category}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.category}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-adding__group" controlId="formDate">
                    <Form.Label className="form-adding__label">Срок выполнения</Form.Label>
                    <Form.Control
                        type="date"
                        className="form-adding__input"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            validateField("date", e.target.value);
                        }}
                        isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.date}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button className="task-page__btn mt-3 w-100" type="submit">
                    Добавить задачу
                </Button>
            </Form>
        </div>
    );
}
