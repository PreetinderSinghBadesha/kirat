"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskCard from "./components/task_card";

export default function DashBoard() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/tasks/user_task')
      .then(response => response.json())
      .then(data => setTasks(data.tasks || []))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = () => {
    router.push('/dashboard/task/add');
  };

  return (
    <div className="bg-[#f6f6f6] h-screen w-screen flex flex-col sm:flex-row overflow-x-hidden">
      <div className="px-2 sm:px-5 sm:pt-5 sm:h-[100%] sm:w-[80%]">
        <div className="bg-[#f6f6f6] flex flex-row w-[95%] justify-between items-center">
          <span className="font-bold text-3xl">Recent Tasks</span>
          <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 mb-4 rounded-full hover:bg-blue-700 transition border-black border-2 shadow-[2px_4px_0_0_rgba(0,0,0,1)]">Add Task</button>
        </div>
        <div className="flex flex-wrap pt-1 gap-x-4 gap-y-10 max-w-full">
          {tasks.map((task, index) => (
            <TaskCard key={index} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
