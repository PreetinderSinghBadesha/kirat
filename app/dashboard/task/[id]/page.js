'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MicroTaskCard from './components/micro_task';

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
                console.log('Task deleted successfully');
                router.push('/dashboard');
            } else {
                console.error('Error deleting task');
            }
        })
        .catch(error => console.error('Error deleting task:', error));
    };

    if (!task) {
        return (
            <div className='bg-[#f6f6f6] h-screen w-full flex overflow-x-hidden justify-center items-center'>
                loading...
            </div>
        );
    }

    return (
        <div className='bg-[#f6f6f6] h-screen w-full flex flex-col overflow-x-hidden p-5'>
            <style jsx>{`
                ::-webkit-scrollbar {
                    width: 10px;
                }
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                ::-webkit-scrollbar-thumb {
                    background: #fff;
                    border-radius: 10px;
                    border: 2px solid black;
                    box-shadow: 2px 4px 0 0 rgba(0, 0, 0, 1);
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
            <div className='flex flex-row justify-between items-center'>
                <p className='text-4xl font-bold mb-5 truncate'>{task.title}</p>
                <div onClick={handleDelete} className='bg-red-500 text-white h-10 px-4 flex justify-center items-center rounded-full hover:bg-red-700 transition duration-300 border-black border-2 shadow-[2px_4px_0_0_rgba(0,0,0,1)]'>
                    delete
                </div>
            </div>
            <p className='text-2xl font-medium mb-3'>Objective</p>
            <p className='text-1xl text-[#909090] break-words'>{task.description}</p>
            <div className='flex w-fit my-5 px-3 py-1 justify-center items-center rounded-full hover:bg-[#e9e9eac7] transition duration-300 border-black border-2 shadow-[2px_4px_0_0_rgba(0,0,0,1)]'>
                <Image src='/alarm.png' alt='clock' width={20} height={20} />
                <p className='text-1xl font-medium ml-2 mr-1'>Deadline:</p>
                <p className='text-1xl'>{new Date(task.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            </div>
            <div className='flex flex-col justify-between'>
                {/* <p className='text-2xl font-medium mb-3'>Micro Tasks</p> */}
                <div className='flex flex-wrap gap-5'>
                    {task.microTask.map((microTask, index) => (
                        <MicroTaskCard key={index} task={microTask} parentId={task._id} index={index} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default TaskPage;