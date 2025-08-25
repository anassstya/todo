import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Task {
    id: number;
    name: string;
    description?: string;
    priority: "low" | "medium" | "high";
    category: string;
    date?: string;
    done: boolean;
    createdAt: string;
}

export interface TaskForm {
    name: string;
    description?: string;
    priority?: "low" | "medium" | "high";
    category: string;
    date?: string;
}

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: []
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskForm>) => {
            const newTask: Task = {
                id: Date.now(),
                done: false,
                priority: action.payload.priority || 'low',
                createdAt: new Date().toISOString(),
                ...action.payload
            };
            state.tasks.push(newTask);
        },

        changeDone: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) {
                task.done = !task.done;
            }
        },

        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        }
    }
});
export const { addTask, changeDone, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
