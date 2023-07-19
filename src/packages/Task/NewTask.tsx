import { TextInput } from '@mantine/core';
import React, {useState} from 'react'
import { TaskType } from '../Task/types/TaskType'

interface NewTaskProps {
    tasks: TaskType[]
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
    route: string
    setNotificationDetails: React.Dispatch<React.SetStateAction<{
        opened: boolean;
        message: string;
        timeout: number;
        status: string
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
            })
        fetchNewTask()
    }

    const fetchNewTask = (
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
                        timeout: 5,
                        status: 'success'
                    }
                )
            })
            .catch(errors => {
                setNotificationDetails(
                    {
                        opened: true,
                        message: `Something went wrong... Please try again later.`,
                        timeout: 5,
                        status: 'error'
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