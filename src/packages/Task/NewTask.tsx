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
            completed: false
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
        setTasks([...tasks, newTask])
        setNewTask({
                name: '',
                completed: false
            })
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