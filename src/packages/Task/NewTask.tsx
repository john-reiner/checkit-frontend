import { TextInput } from '@mantine/core';
import React, {useState, useEffect} from 'react'
import { TaskType } from '../Task/types/TaskType'

import NotificationDialog from '../Global/NotificationDialog';

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
            id: tasks.length
        });
    
    const [notificationDetails, setNotificationDetails] = useState({
        opened: false,
        message: '',
        title: '',
        timeout: 0,
        color: ""
    })

    const closeDialog = () => {
        setNotificationDetails({
            opened: false,
            message: '',
            title: '',
            timeout: 0,
            color: ''
        })
    }

    const handleNewTaskChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewTask({...newTask, [e.target.name]: e.target.value})
    }

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        console.log("New Task ID: ", newTask.id)
        console.log("tasks: ", tasks)
        e.preventDefault()
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
            .then(data => {
                setNotificationDetails(
                    {
                        opened: true,
                        message: `Task: "${data.name}" created!`,
                        title: "Success!",
                        timeout: 3,
                        color: 'green'
                    }
                )
            });
    }


    return (
        <>
            <NotificationDialog 
                opened={notificationDetails.opened} 
                message={notificationDetails.message} 
                title={notificationDetails.title}
                closeDialog={closeDialog}
                timeout={notificationDetails.timeout}
                color={notificationDetails.color}
            />
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