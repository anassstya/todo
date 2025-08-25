import React from "react";
import {useDispatch} from "react-redux";
import {Button, Table} from "react-bootstrap";
import {changeDone, deleteTask} from "../modules/tasksSlice.ts";

export default function TaskWrapper({tasks}){
    const dispatch = useDispatch();
    const categoryNames = ['Название', 'Описание', 'Приоритет', 'Категория', 'Срок выполнения', 'Выполнено', 'Удалить'];

    const priorityClass = {
        "low": "task-wrapper__circle-low",
        "medium": "task-wrapper__circle-medium",
        "high": "task-wrapper__circle-high",
    };

    return(
        <Table className="task-wrapper">
            <thead>
            <tr>
                {categoryNames.map((name, idx) => (
                    <th
                        key={idx}
                        className={`task-wrapper__header ${
                            (name === "Описание" || name === "Срок выполнения") ? "d-none d-sm-table-cell" : ""
                        }`}
                    >
                        {name}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
               {tasks.map(i => (
                   <tr  key={i.id}>
                       <td className="task-wrapper__text align-middle">{i.name}</td>
                       <td className="d-none d-sm-table-cell task-wrapper__text align-middle">{i.description || '–'}</td>
                       <td className="task-wrapper__text align-middle">
                           <div className={`m-auto task-wrapper__circle ${priorityClass[i.priority] || ""}`}></div>
                       </td>
                       <td className="task-wrapper__text align-middle">{i.category}</td>
                       <td className="d-none d-sm-table-cell task-wrapper__text align-middle">{i.date || 'Бессрочная'}</td>
                       <td className="task-wrapper__text align-middle">
                           <Button
                               className="task-wrapper__btn"
                               onClick={() => dispatch(changeDone(i.id))}
                           >
                               {i.done ? '✓' : '—'}
                           </Button>
                       </td>
                       <td className="task-wrapper__text">
                           <Button className="task-wrapper__deleteBtn" onClick={() => dispatch(deleteTask(i.id))}>
                               🗑
                           </Button>
                       </td>
                   </tr>
               ))}
            </tbody>
        </Table>
    )
}