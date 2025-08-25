import React from "react";
import {Card, Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import '../styles/App.scss';
import TaskByCategory from "../Components/TaskByCategory.tsx";

export default function StatsPage(){
    const tasks = useSelector((state: any) => state.tasks.tasks);

    const activeCount = tasks.filter((task: any) => !task.done).length;
    const doneCount = tasks.filter((task: any) => task.done).length;

    return (
        <Container className="stats-page my-5">
            <h1 className="stats-page__slogan text-center">Статистика по задачам</h1>

            <div className="stats-page__cards d-flex gap-3 flex-wrap justify-content-center">
                <Card className="state-page__card" style={{backgroundColor: '#FFA07A'}}>
                    <Card.Body>
                        <Card.Title>Активные задачи</Card.Title>
                        <Card.Text className="text-center">
                            {activeCount}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="state-page__card" style={{backgroundColor: '#90EE90'}}>
                    <Card.Body>
                        <Card.Title>Выполненные задачи</Card.Title>
                        <Card.Text className="text-center">
                            {doneCount}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="state-page__card" style={{backgroundColor: '#AFEEEE'}}>
                    <Card.Body>
                        <Card.Title>Всего задач</Card.Title>
                        <Card.Text className="text-center">
                            {tasks.length}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

            <TaskByCategory/>
        </Container>
    );
}