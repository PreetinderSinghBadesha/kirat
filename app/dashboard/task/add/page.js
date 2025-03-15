"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [microTasks, setMicroTasks] = useState([{ title: '', description: '' }]);
  const router = useRouter();

  const handleAddTask = async (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate, microTask: microTasks };

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Error adding task:', await response.json());
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleMicroTaskChange = (index, field, value) => {
    const newMicroTasks = [...microTasks];
    newMicroTasks[index][field] = value;
    setMicroTasks(newMicroTasks);
  };

  const handleAddMicroTask = () => {
    setMicroTasks([...microTasks, { title: '', description: '' }]);
  };

  return (
    <div className="bg-[#f6f6f6] h-screen w-screen flex flex-col items-center justify-center">
      <form onSubmit={handleAddTask} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <h2 className="text-xl font-bold mb-2">Micro Tasks</h2>
        {microTasks.map((microTask, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Micro Task Title"
              value={microTask.title}
              onChange={(e) => handleMicroTaskChange(index, 'title', e.target.value)}
              className="border p-2 mb-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Micro Task Description"
              value={microTask.description}
              onChange={(e) => handleMicroTaskChange(index, 'description', e.target.value)}
              className="border p-2 mb-2 w-full"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddMicroTask} className="bg-green-500 text-white p-2 w-full mb-4">Add Micro Task</button>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Add Task</button>
      </form>
    </div>
  );
}
