import { TextInput } from '@mantine/core';
import React, {useState, useEffect} from 'react'
import { TaskType } from '../Task/types/TaskType'

interface NewTaskProps {
    tasks: TaskType[]
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

export default function NewTask({
    tasks, 
    setTasks
}: NewTaskProps) {

    const [newTask, setNewTask] = useState<TaskType>(
        {
            name: '',
            completed: false,
            id: 0
        });

    useEffect(() => {
    }, []);

    const handleNewTaskChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewTask({...newTask, [e.target.name]: e.target.value})
    }

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        newTask.id = tasks.length + 1
        setTasks([...tasks, newTask])
        setNewTask({
                name: '',
                completed: false,
                id: 0
            })
        fetchNewTask(newTask)
    }

    const fetchNewTask = (
        task: TaskType
    ) => {
        fetch('http://localhost:3000/tasks',
        {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(response => response.json())
            .then(data => console.log("New Task Created"));
    }


    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                placeholder="New Task"
                variant="filled"
                radius="xl"
                value={newTask.name}
                onChange={handleNewTaskChange}
                name='name'
            />
        </form>
    )
}