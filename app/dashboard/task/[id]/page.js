'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const TaskPage = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/tasks/${id}`)
                .then(response => response.json())
                .then(data => setTask(data.task))
                .catch(error => console.error('Error fetching task:', error));
        }
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Task Details</h1>
            <p><strong>ID:</strong> {task.id}</p>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.completed ? 'Completed' : 'In Progress'}</p>
        </div>
    );
};

export default TaskPage;