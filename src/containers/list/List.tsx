import React, {useState, useEffect} from 'react'
import { TaskType } from '../../types/TaskType'

import Task  from './Task'


interface ListProps {
}

export default function List({
    
}: ListProps) {

    const [tasks, setTasks] = useState<TaskType[]>([
        {
            name: 'a fake task to test',
            completed: false
        }
    ]);

    useEffect(() => {
    }, []);

    const renderTasks = (
        tasks: TaskType[]
    ) => {
        if (tasks && tasks.length > 0) {
            return tasks.map(task => {
                return <Task taskProps={{...task}}/>
            })
        }
    }

    return (
        <div>
            <h2>Tasks</h2>
            {renderTasks(tasks)}
        </div>
    )
}