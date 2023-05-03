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
    }

    return (
        <Container>
            <h2>Tasks</h2>
            <NewTask tasks={tasks} setTasks={setTasks}/>
            <Divider my="sm" />
            <Stack>
                {renderTasks()}
            </Stack>
        </Container>
    )
}