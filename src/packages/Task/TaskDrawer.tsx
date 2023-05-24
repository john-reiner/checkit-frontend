import { Drawer, Switch } from '@mantine/core';
import React, {useState, useEffect} from 'react'
import { TaskType } from './types/TaskType'

interface TaskDrawerProps {
    opened: boolean,
    close: () => void,
    task: TaskType
    setTask: React.Dispatch<React.SetStateAction<TaskType>>
}

export default function TaskDrawer({
    opened,
    close,
    task,
    setTask
}: TaskDrawerProps) {

    console.log(task)


    return (
            <Drawer
                opened={opened}
                onClose={close}
                position="right" 
            >
               <h4>{task.name}</h4>
               <Switch
                    label="Completed"
                    checked={task.completed}
                    onChange={() => setTask({...task, completed: !task.completed})}
                    name='checked'

                />
            </Drawer>
    )
}