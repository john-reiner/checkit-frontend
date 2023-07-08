import React, {useState} from 'react'
import { TaskType } from './types/TaskType'
import { IconTrash, IconSquare, IconSquareCheck, IconEditCircle } from '@tabler/icons-react';

import { ActionIcon, Group, Paper, Space, Text, TextInput } from '@mantine/core';

interface TaskProps {
    taskProps: TaskType
    deleteTask: (taskId: number | undefined) => void
    setNotificationDetails: React.Dispatch<React.SetStateAction<{
        opened: boolean;
        message: string;
        timeout: number;
        status: string
    }>>
}

export default function Task({
    taskProps,
    deleteTask,
    setNotificationDetails
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
        updateFetchTask({completed: newCompletedState})
    }

    const handleTaskChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTask({...task, [e.target.name]: e.target.value})
    }

    const handleNameSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        updateFetchTask({"name": task.name})
        e.preventDefault()
        setEditName(false)
    }

    const updateFetchTask = (
        value: object,
    ) => {
        setEditName(false)
        fetch(`http://localhost:3000/tasks/${task.id}`,
        {
            method: 'PATCH',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(response => response.json())
        .then(data => {
            setNotificationDetails(
                {
                    opened: true,
                    message: `Task: "${data.name}" updated!`,
                    timeout: 3,
                    status: "success"
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

    const handleIconRender = () => {
        if (task.completed) {
            return <IconSquareCheck color='green' size="1.5rem" />
        } else {
            return <IconSquare size="1.5rem" />
        }
    }

    const renderText = () => {
        if (editName) {
            return (
                <form onSubmit={handleNameSubmit}>
                    <TextInput

                        value={task.name}
                        onChange={handleTaskChange}
                        name='name'
                    />
                </form>
            )
        } else {
            return(
                <Text
                    td={task.completed ? "line-through" : undefined}
                    onClick={() => setEditName(true)}

                >
                    {task.name}
                </Text>
            )
        }
    }

    const handleDeleteClick = () => {
        deleteTask(task.id)
        fetch(`http://localhost:3000/tasks/${task.id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setNotificationDetails(
                {
                    opened: true,
                    message: `Task: "${data.name}" deleted!`,
                    timeout: 3,
                    status: "success"
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
        <Paper shadow="xs" p="xs" withBorder> 
            <Group position="apart">
                <Group>
                    <ActionIcon 
                        variant="transparent"
                        onClick={handleCheck}
                    >
                        {handleIconRender()}
                    </ActionIcon>
                    
                    {renderText()}

                </Group>
                <Space w="md" />
                <Group>
                    <ActionIcon onClick={() => setEditName(!editName)} color="blue" radius="xl" variant="outline">
                    <   IconEditCircle  size="1.125rem" />
                    </ActionIcon>
                    <ActionIcon color="red" radius="xl" variant="outline" onClick={handleDeleteClick}>
                    <   IconTrash size="1.125rem" />
                    </ActionIcon>
                </Group>
            </Group>
        </Paper>
    )
}