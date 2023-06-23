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
                return <Task taskProps={{...task}} key={task.id}/>
            })
        }
    }


    return (
        <Paper shadow="xs" p="md" >
            <Title order={2}>{listTitle}</Title>   
            <Divider my="sm" />
                <Stack spacing="xs">
                    {renderTasks()}
                    <NewTask tasks={tasks} setTasks={setTasks}/>
                </Stack>
        </Paper>
    )
}