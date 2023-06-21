import React, {useState, useEffect} from 'react'
import { TaskType } from '../Task/types/TaskType'
import { Stack, Divider, Container, TextInput } from '@mantine/core';


import Task  from '../Task/Task'
import NewTask from '../Task/NewTask';


interface ListProps {
}

export default function List({
    
}: ListProps) {

    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        fetchTasks()
      }, []);


    const fetchTasks = () => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(data => setTasks(data));
    }
    

    const renderTasks = (
    ) => {
        if (tasks && tasks.length > 0) {
            return tasks.map(task => {
                return <Task taskProps={{...task}} handleDelete={handleDelete} key={task.id}/>
            })
        }
    }

    const handleDelete = (
        id: number,
    ) => {
        setTasks(tasks.filter(task => task.id !== id))
        fetch(`http://localhost:3000/tasks/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return (
        <>
            <h2>Tasks</h2>
            <NewTask tasks={tasks} setTasks={setTasks}/>
            <Divider my="sm" />
            <Stack>
                {renderTasks()}
            </Stack>
        </>
    )
}