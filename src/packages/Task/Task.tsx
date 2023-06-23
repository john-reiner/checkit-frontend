import React, {useState, useEffect} from 'react'
import { TaskType } from './types/TaskType'
import { IconZoomIn, IconTrash, IconSquare, IconSquareCheck } from '@tabler/icons-react';

import { ActionIcon, Checkbox, Group, Paper, Space, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface TaskProps {
    taskProps: TaskType 
}

export default function Task({
    taskProps,
}: TaskProps) {

    const [task, setTask] = useState<TaskType>({
        name: taskProps.name,
        completed: taskProps.completed,
        id: taskProps.id
    })

    const [opened, { open, close }] = useDisclosure(false);

    const [editName, setEditName] = useState<boolean>(false)

    const handleCheck = (

    ) => {
        const newCompletedState = !task.completed
        setTask({...task, completed: newCompletedState})
        updateFetchTask({completed: newCompletedState})
    }

    const handleTaskChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        setEditName(false)
    }

    const updateFetchTask = (
        value: object
    ) => {
        fetch(`http://localhost:3000/tasks/${task.id}`,
        {
            method: 'PATCH',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const handleIconRender = () => {
        if (task.completed) {
            return <IconSquareCheck color='green' size="1.5rem" />
        } else {
            return <IconSquare size="1.5rem" />
        }
    }



    return (
        <Paper shadow="xs" p="xs" withBorder> 
            <Group position="apart">
                <Group>
                    <ActionIcon 
                        variant="transparent"
                        onClick={handleCheck}
                    >
                        {handleIconRender()}
                    </ActionIcon>
                    <Text
                        td={task.completed ? "line-through" : undefined}
                    >
                        {task.name}
                    </Text>

                </Group>
                {/* {editName ? 
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            placeholder="New Task"
                            variant="filled"
                            radius="xl"
                            value={task.name}
                            onChange={handleTaskChange}
                            name='name'
                        />                    
                    </form> :
            } */}
                <Space w="md" />
                <Group>
                    <ActionIcon color="blue" radius="xl" variant="outline" onClick={open}>
                    <   IconZoomIn size="1.125rem" />
                    </ActionIcon>
                    <ActionIcon color="red" radius="xl" variant="outline">
                    <   IconTrash size="1.125rem" />
                    </ActionIcon>
                </Group>
            </Group>
        </Paper>
    )
}