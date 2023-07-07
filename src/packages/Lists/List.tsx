import React, {useState, useEffect} from 'react'
import { TaskType } from '../Task/types/TaskType'
import { Stack, Divider, Paper, Title } from '@mantine/core';


import Task  from '../Task/Task'
import NewTask from '../Task/NewTask';


interface ListProps {
    listTitle: string
    route: string
}

export default function List({
    listTitle,
    route,
}: ListProps) {

    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
      fetchTasks()
    }, []);

    const fetchTasks = () => {
        fetch(route)
          .then(response => response.json())
          .then(data => setTasks(data));
      }

    const renderTasks = (
    ) => {
        if (tasks && tasks.length > 0) {
            return tasks.map(task => {
                return <Task taskProps={{...task}} key={task.id} deleteTask={deleteTask}/>
            })
        }
    }

    const deleteTask = (
        taskId: number
      ) => {
        var newTaskList = tasks.filter(task =>  task.id !== taskId)
        setTasks(newTaskList)
      }


    return (
        <Paper shadow="xs" p="md" >
            <Title order={2}>{listTitle}</Title>   
            <Divider my="sm" />
                <Stack spacing="xs">
                    {renderTasks()}
                    <NewTask route={route} tasks={tasks} setTasks={setTasks}/>
                </Stack>
        </Paper>
    )
}