import { TextInput } from '@mantine/core';
import React, {useState, useEffect} from 'react'
import { TaskType } from '../Task/types/TaskType'

interface NewTaskProps {
    tasks: TaskType[]
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
    route: string
    setNotificationDetails: React.Dispatch<React.SetStateAction<{
        opened: boolean;
        message: string;
        title: string;
        timeout: number;
        color: string;
    }>>
}

export default function NewTask({
    tasks, 
    setTasks,
    route,
    setNotificationDetails
}: NewTaskProps) {

    const [newTask, setNewTask] = useState<TaskType>(
        {
            name: '',
            completed: false,
            // id: tasks.length
        });
    
    const handleNewTaskChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewTask({...newTask, [e.target.name]: e.target.value})
    }

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        setNewTask({
                name: '',
                completed: false,
                // id: 0
            })
        fetchNewTask()
    }

    const fetchNewTask = (
        // task: TaskType
    ) => {
        fetch(route,
        {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(response => response.json())
            .then(returnedTask => {
                setTasks([...tasks, returnedTask])
                setNotificationDetails(
                    {
                        opened: true,
                        message: `Task: "${returnedTask.name}" created!`,
                        title: "Success!",
                        timeout: 3,
                        color: 'green'
                    }
                )
            });
    }


    return (
        <>

            <form onSubmit={handleSubmit}>
                <TextInput
                    placeholder="New Task"
                    variant="filled"
                    radius="sm"
                    value={newTask.name}
                    onChange={handleNewTaskChange}
                    name='name'
                />
            </form>
        
        </>
    )
}