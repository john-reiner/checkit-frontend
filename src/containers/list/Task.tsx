import React, {useState, useEffect} from 'react'
import { TaskType } from '../../types/TaskType'

import { Checkbox } from '@mantine/core';

interface TaskProps {
    taskProps: TaskType 
}

export default function Task({
    taskProps
}: TaskProps) {

    const [task, setTask] = useState<TaskType>({
        name: taskProps.name,
        completed: taskProps.completed
    })

    const handleCheck = (

    ) => {
        const newCompletedState = !task.completed
        setTask({...task, completed: newCompletedState})
        console.log(newCompletedState)
    }

    return (
        <Checkbox checked={task.completed} label={task.name} onChange={handleCheck} />
    )
}