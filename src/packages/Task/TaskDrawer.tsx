import { Drawer, Switch } from '@mantine/core';
import React, {useState, useEffect} from 'react'
import { TaskType } from './types/TaskType'

interface TaskDrawerProps {
    opened: boolean,
    close: () => void,
    task: TaskType
}

export default function TaskDrawer({
    opened,
    close,
    task
}: TaskDrawerProps) {

    console.log(task)


    return (
            <Drawer
                opened={opened}
                onClose={close}
                title={task.name}
                position="right" 
            >
               <h4>{task.name}</h4>
               <Switch
                    label="Completed"
                    checked={task.completed}

                />
            </Drawer>
    )
}