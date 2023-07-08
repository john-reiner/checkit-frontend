import React, {useState, useEffect} from 'react'
import { TaskType } from '../Task/types/TaskType'
import { Stack, Divider, Paper, Title } from '@mantine/core';


import Task  from '../Task/Task'
import NewTask from '../Task/NewTask';
import NotificationDialog from '../Global/NotificationDialog';


interface ListProps {
    listTitle: string
    route: string
}

export default function List({
    listTitle,
    route,
}: ListProps) {

    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [notificationDetails, setNotificationDetails] = useState({
        opened: false,
        message: '',
        timeout: 0,
        status: "success"
    })

    useEffect(() => {
        fetchTasks()
    }, []);

    const fetchTasks = () => {
        fetch(route)
        .then(response => response.json())
        .then(data => setTasks(data))
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
        if (tasks && tasks.length > 0) {
            return tasks.map(task => {
                return <Task 
                            taskProps={{...task}} 
                            key={task.id} 
                            deleteTask={deleteTask}
                            setNotificationDetails={setNotificationDetails}
                        />
            })
        }
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
                <Title order={2}>{listTitle}</Title>   
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