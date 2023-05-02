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

    return (
        <Checkbox checked={task.completed} label={task.name} />
    )
}