import React, {useState, useEffect} from 'react'
import { TaskType } from '../Task/types/TaskType'
import { Stack, Divider, Container, Paper, Title, Space } from '@mantine/core';


import Task  from '../Task/Task'
import NewTask from '../Task/NewTask';


interface ListProps {
    listTitle: string
    tasks: TaskType[]
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

export default function List({
    listTitle,
    tasks,
    setTasks
}: ListProps) {
    

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
        <Paper shadow="xs" p="md" withBorder>
            <Title order={2}>{listTitle}</Title>   
            <Divider my="sm" />
                <Stack spacing="xs">
                    {renderTasks()}
                    <NewTask tasks={tasks} setTasks={setTasks}/>
                </Stack>
        </Paper>
    )
}