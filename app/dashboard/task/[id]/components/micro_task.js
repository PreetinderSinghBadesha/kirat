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
                setCompleted(!completed);
            } else {
                console.error(`Failed to update micro task ${index}`);
            }
        } catch (error) {
            console.error(`Error updating micro task ${index}:`, error);
        }
    };

    return (
        <div
            onClick={handleToggleCompleted}
            className="flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-black rounded-2xl shadow-[2px_3px_0_0_rgba(0,0,0,1)] mb-2.5 max-w-[640px] cursor-pointer"
        >
            <div
                className="w-[22px] h-[22px] rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                style={{ background: completed ? '#000000' : '#ffffff' }}
            >
                {completed && <span>✓</span>}
            </div>
            <div>
                <p
                    className="m-0 font-semibold text-[15px]"
                    style={{
                        textDecoration: completed ? 'line-through' : 'none',
                        color: completed ? '#999999' : '#000000',
                    }}
                >
                    {task.title}
                </p>
                {task.description && (
                    <p className="mt-0.5 text-[13px] text-[#999999]">{task.description}</p>
                )}
            </div>
        </div>
    );
}
