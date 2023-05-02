import React, {useState, useEffect} from 'react'
import { TaskType } from '../../types/TaskType'
import { Stack, Divider, Container } from '@mantine/core';


import Task  from './Task'


interface ListProps {
}

export default function List({
    
}: ListProps) {

    const [tasks, setTasks] = useState<TaskType[]>([
        {
            name: 'a fake task to test',
            completed: false
        },
        {
            name: 'a fake task to test',
            completed: false
        },
        {
            name: 'a fake task to test',
            completed: false
        }
    ]);

    useEffect(() => {
    }, []);

    const renderTasks = (
        tasks: TaskType[]
    ) => {
        if (tasks && tasks.length > 0) {
            return tasks.map(task => {
                return <Task taskProps={{...task}}/>
            })
        }
    }

    return (
        <Container>
            <h2>Tasks</h2>
            <Divider my="sm" />
            <Stack>
                {renderTasks(tasks)}
            </Stack>

        </Container>
    )
}