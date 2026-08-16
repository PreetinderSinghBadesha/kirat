'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MicroTaskCard from './components/micro_task';
import { STATUS_META, formatDate } from '../../tasks_context';

const TaskPage = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            fetch(`/api/tasks/${id}`)
                .then(response => response.json())
                .then(data => setTask(data.task))
                .catch(error => console.error('Error fetching task:', error));
        }
    }, [id]);

    const handleDelete = () => {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                router.push('/dashboard');
            } else {
                console.error('Error deleting task');
            }
        })
        .catch(error => console.error('Error deleting task:', error));
    };

    if (!task) {
        return (
            <div className='min-h-screen w-full flex justify-center items-center'>
                loading...
            </div>
        );
    }

    const meta = STATUS_META[task.status] || STATUS_META['in-progress'];

    return (
        <div className='min-h-screen w-full p-6 sm:p-8'>
            <div
                onClick={() => router.push('/dashboard')}
                className='inline-flex items-center gap-1.5 mb-5 cursor-pointer text-sm font-semibold text-[#5594f1]'
            >
                ← Back to tasks
            </div>

            <div className='flex justify-between items-start gap-4 mb-1.5'>
                <p className='text-[32px] font-bold m-0 break-words'>{task.title}</p>
                <button
                    onClick={handleDelete}
                    className='bg-[#f26e56] text-white h-10 px-[18px] flex items-center justify-center rounded-full border-2 border-black shadow-[2px_4px_0_0_rgba(0,0,0,1)] cursor-pointer font-semibold text-sm whitespace-nowrap'
                >
                    Delete
                </button>
            </div>

            <span
                className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full mb-5"
                style={{ color: meta.color, background: `${meta.color}22` }}
            >
                {meta.label}
            </span>

            <p className='text-xl font-semibold mb-2'>Objective</p>
            <p className='text-[15px] leading-relaxed text-[#666666] max-w-[640px] mb-5 break-words'>
                {task.description}
            </p>

            <div className='inline-flex items-center gap-2 border-2 border-black rounded-full px-4 py-2 shadow-[2px_4px_0_0_rgba(0,0,0,1)] mb-7 text-sm'>
                <span className='font-semibold'>Deadline:</span>
                <span>{formatDate(task.dueDate)}</span>
            </div>

            <p className='text-xl font-bold mb-3'>Microtasks</p>
            <div className='flex flex-col'>
                {task.microTask.map((microTask, index) => (
                    <MicroTaskCard key={index} task={microTask} parentId={task._id} index={index} />
                ))}
            </div>
        </div>
    );
};

export default TaskPage;
