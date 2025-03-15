import { useState } from 'react';

export default function MicroTaskCard({ task, parentId, index }) {
    const [completed, setCompleted] = useState(task.completed);

    const handleToggleCompleted = async () => {
        const updatedTask = { completed: !completed, taskId: parentId };
        try {
            const response = await fetch(`/api/tasks/microtask/${index}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });
            if (response.ok) {
                console.log(`Micro Task ${index} updated successfully`);
                setCompleted(!completed);
            } else {
                console.error(`Failed to update micro task ${index}`);
            }
        } catch (error) {
            console.error(`Error updating micro task ${index}:`, error);
        }
    };

    return (
        <div onClick={handleToggleCompleted} className="cursor-pointer bg-[#ffffff] hover:bg-[#e9e9eac7] sm:max-h-full w-full max-w-full sm:w-[30%] p-5 border-2 flex flex-row justify-between border-black rounded-2xl shadow-[2px_4px_0_0_rgba(0,0,0,1)]">
            <div className="flex flex-col overflow-hidden">
                <span className="font-bold text-xl truncate">{task.title}</span>
                <span className="font-light mt-3 break-words overflow-hidden text-ellipsis line-clamp-2">{task.description}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
                {completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white bg-[#52c1c5] rounded-md border-1 border-black shadow-[1px_2px_0_0_rgba(0,0,0,1)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white  rounded-md border-1 border-black shadow-[1px_2px_0_0_rgba(0,0,0,1)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> */}
                    </svg>
                )}
            </div>
        </div>
    );
}