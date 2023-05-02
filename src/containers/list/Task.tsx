import React, {useState, useEffect} from 'react'
import { TaskType } from '../../types/TaskType'


interface TaskProps {
    taskProps: TaskType 
}

export default function Task({
    taskProps
}: TaskProps) {

    return (
        <div>
            <p>{taskProps.name}</p>
        </div>
    )
}