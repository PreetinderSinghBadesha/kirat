"use client"

import CircularProgressBar from "./process_bar";
import { useRouter } from "next/navigation";
import { STATUS_META, formatDate } from "../tasks_context";

export default function TaskCard({ task }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/dashboard/task/${task._id}`);
    };

    const meta = STATUS_META[task.status] || STATUS_META["in-progress"];
    const completedMicroTasks = task.microTask?.filter((m) => m.completed).length || 0;
    const totalMicroTasks = task.microTask?.length || 0;
    const progress = totalMicroTasks > 0 ? (completedMicroTasks / totalMicroTasks) * 100 : 0;

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer bg-white border-2 border-black rounded-[20px] p-5 shadow-[2px_4px_0_0_rgba(0,0,0,1)] flex justify-between gap-3 hover:bg-[#fafafa] transition-colors"
        >
            <div className="overflow-hidden min-w-0">
                <span
                    className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full mb-2"
                    style={{ color: meta.color, background: `${meta.color}22` }}
                >
                    {meta.label}
                </span>
                <p className="font-bold text-lg mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {task.title}
                </p>
                <p className="text-sm text-[#666666] mb-3 overflow-hidden line-clamp-2">
                    {task.description}
                </p>
                <div className="flex gap-3.5 text-xs text-[#999999]">
                    <span>{totalMicroTasks} tasks</span>
                    <span>Due {formatDate(task.dueDate)}</span>
                </div>
            </div>
            <CircularProgressBar percentage={progress} color={meta.color} sqSize={56} strokeWidth={5} />
        </div>
    );
}
