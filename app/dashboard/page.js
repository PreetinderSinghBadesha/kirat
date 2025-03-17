"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TaskCard from "./components/task_card";

function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4 sm:p-0">
      <div className="bg-white p-5 rounded relative shadow-lg w-full max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default function DashBoard() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [microTasks, setMicroTasks] = useState([
    { title: "", description: "" },
  ]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/tasks/user_task")
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks || []))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleModal = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate, microTask: microTasks };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setShowModal(false);
        router.refresh();
        router.push("/dashboard");
      } else {
        console.error("Error adding task:", await response.json());
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleMicroTaskChange = (index, field, value) => {
    const newMicroTasks = [...microTasks];
    newMicroTasks[index][field] = value;
    setMicroTasks(newMicroTasks);
  };

  const handleAddMicroTask = () => {
    setMicroTasks([...microTasks, { title: "", description: "" }]);
  };

  const handleDeleteMicroTask = (index) => {
    const newMicroTasks = microTasks.filter((_, i) => i !== index);
    setMicroTasks(newMicroTasks);
  };

  return (
    <div className="bg-[#f6f6f6] h-screen w-screen flex flex-col sm:flex-row overflow-x-hidden relative">
      <div className="px-2 sm:px-5 sm:pt-5 sm:h-[100%] sm:w-[80%]">
        <div className="bg-[#f6f6f6] flex flex-row w-[95%] justify-between items-center">
          <span className="font-bold text-3xl">Recent Tasks</span>
          <button
            onClick={handleModal}
            className="bg-blue-500 text-white p-2 mb-4 rounded-full hover:bg-blue-700 transition border-black border-2 shadow-[2px_4px_0_0_rgba(0,0,0,1)]"
          >
            Add Task
          </button>
        </div>
        <div className="flex flex-wrap pt-1 gap-x-4 gap-y-10 max-w-full">
          {tasks.map((task, index) => (
            <TaskCard key={index} task={task} />
          ))}
        </div>
      </div>
      <Modal show={showModal} onClose={handleModalClose}>
        <form
          onSubmit={handleAddTask}
          className="bg-white p-6 rounded w-full"
        >
          <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <h2 className="text-xl font-bold mb-2">Micro Tasks</h2>
          {microTasks.map((microTask, index) => (
            <div key={index} className="mb-4 relative">
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-gray-700">Micro Task Title</label>
                <button
                  type="button"
                  onClick={() => handleDeleteMicroTask(index)}
                  className="text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 6h18M8 6v12m8-12v12M5 6l1 14a2 2 0 002 2h8a2 2 0 002-2l1-14"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"
                    />
                  </svg>
                </button>
              </div>

              <input
                type="text"
                placeholder="Micro Task Title"
                value={microTask.title}
                onChange={(e) =>
                  handleMicroTaskChange(index, "title", e.target.value)
                }
                className="border p-2 w-full rounded"
                required
              />
              <div>
                <label className="block text-gray-700 mb-2">
                  Micro Task Description
                </label>
                <input
                  type="text"
                  placeholder="Micro Task Description"
                  value={microTask.description}
                  onChange={(e) =>
                    handleMicroTaskChange(index, "description", e.target.value)
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMicroTask}
            className="bg-green-500 text-white p-2 w-full mb-4 rounded"
          >
            Add Micro Task
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded"
          >
            Add Task
          </button>
        </form>
      </Modal>
    </div>
  );
}
