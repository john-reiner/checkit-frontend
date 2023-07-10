import React, {useState, useEffect} from 'react'
import { TaskType } from '../Task/types/TaskType'
import { Stack, Divider, Paper, Title, Group, SegmentedControl, Button } from '@mantine/core';

import Task  from '../Task/Task'
import NewTask from '../Task/NewTask';
import NotificationDialog from '../Global/NotificationDialog';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';


interface ListProps {
    listTitle: string
    route: string
}

export default function List({
    listTitle,
    route,
}: ListProps) {

    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [showCompleted, setShowCompleted] = useState(false)
    const [notificationDetails, setNotificationDetails] = useState({
        opened: false,
        message: '',
        timeout: 0,
        status: "success"
    })
    
    useEffect(() => {
        fetchTasks()
    }, [showCompleted]);
    
    const handleShowCompleted = () => {
        setShowCompleted(!showCompleted)
        // setOrganizeList(true)
    }
    
    const fetchTasks = () => {
        fetch(route)
        .then(response => response.json())
        .then(data => {
            setTasks(data)
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


    const closeDialog = () => {
        setNotificationDetails({
            opened: false,
            message: '',
            timeout: 0,
            status: ''
        })
    }

    const renderTasks = (
    ) => {
        return tasks.map(task => {
            if (task.completed === showCompleted) {
                return <Task 
                            taskProps={{...task}} 
                            key={task.id} 
                            deleteTask={deleteTask}
                            setNotificationDetails={setNotificationDetails}
                        />
            }
            }
        )
    }

    const deleteTask = (
        taskId: number | undefined
    ) => {
        if (taskId) {
            var newTaskList = tasks.filter(task =>  task.id !== taskId)
            setTasks(newTaskList)
        }
    }

    return (
        <>
            <NotificationDialog 
                opened={notificationDetails.opened} 
                message={notificationDetails.message} 
                closeDialog={closeDialog}
                timeout={notificationDetails.timeout}
                status={notificationDetails.status}
            />
            <Paper shadow="xs" p="md" >
                <Group position='apart'>
                    <Group>
                        <Title order={2}>{listTitle + ` (${tasks.length})`}</Title>   
                    </Group>
                    <Group>
                        <Button 
                            leftIcon={showCompleted ? <IconEyeOff /> : <IconEyeCheck />}
                            variant={showCompleted ? "outline" : "filled"}
                            onClick={handleShowCompleted}
                        >
                            {showCompleted ? "Hide Completed" : "Show Completed"}
                        </Button>
                    </Group>
                </Group>
                <Divider my="sm" />
                    <Stack spacing="xs">
                        {renderTasks()}
                        <NewTask 
                            route={route} 
                            tasks={tasks} 
                            setTasks={setTasks}
                            setNotificationDetails={setNotificationDetails}
                        />
                    </Stack>
            </Paper>
        </>
    )
}