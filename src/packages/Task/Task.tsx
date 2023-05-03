import React, {useState, useEffect} from 'react'
import { TaskType } from './types/TaskType'
import { IconAdjustments, IconTrash } from '@tabler/icons-react';

import { ActionIcon, Checkbox, Group, Space, TextInput } from '@mantine/core';

interface TaskProps {
    taskProps: TaskType 
    handleDelete: (id: number) => void
}

export default function Task({
    taskProps,
    handleDelete
}: TaskProps) {

    const [task, setTask] = useState<TaskType>({
        name: taskProps.name,
        completed: taskProps.completed,
        id: taskProps.id
    })

    const [editName, setEditName] = useState<boolean>(false)

    const handleCheck = (

    ) => {
        const newCompletedState = !task.completed
        setTask({...task, completed: newCompletedState})
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



    return (

        <Group>
            {editName ? 
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
            <Checkbox checked={task.completed} label={task.name} onChange={handleCheck} />
        }
            <Space w="md" />
            <Group>
                <ActionIcon color="blue" radius="xl" variant="outline" onClick={() => setEditName(!editName)}>
                <   IconAdjustments size="1.125rem" />
                </ActionIcon>
                <ActionIcon color="red" radius="xl" variant="outline" onClick={() => handleDelete(task.id)}>
                <   IconTrash size="1.125rem" />
                </ActionIcon>
            </Group>
        </Group>
    )
}