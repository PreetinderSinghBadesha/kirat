"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TaskCard from "./components/task_card";
import { STATUS_META, formatDate, useTasks } from "./tasks_context";

function AddTaskModal({ show, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [microTasks, setMicroTasks] = useState([{ title: "", description: "" }]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!show) return null;

  const resetAndClose = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setMicroTasks([{ title: "", description: "" }]);
    setErrorMessage("");
    onClose();
  };

  const handleMicroTaskChange = (index, field, value) => {
    const next = [...microTasks];
    next[index][field] = value;
    setMicroTasks(next);
  };

  const handleAddMicroTask = () => {
    setMicroTasks([...microTasks, { title: "", description: "" }]);
  };

  const handleRemoveMicroTask = (index) => {
    setMicroTasks(microTasks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          microTask: microTasks.filter((m) => m.title.trim()),
        }),
      });

      const raw = await response.text();
      let parsed = null;
      try {
        parsed = raw ? JSON.parse(raw) : null;
      } catch {
        // response wasn't JSON, fall through with raw text
      }

      if (response.ok) {
        await onCreated();
        resetAndClose();
      } else {
        console.error(
          `Error adding task: HTTP ${response.status} ${response.statusText}`,
          parsed || raw
        );
        setErrorMessage(
          (parsed && parsed.error) ||
            raw ||
            `Request failed with status ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error adding task:", error);
      setErrorMessage(error.message || "Something went wrong. Check the console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5"
      onClick={resetAndClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#f6f6f6] rounded-[20px] border-2 border-black shadow-[4px_6px_0_0_rgba(0,0,0,1)] p-7 w-[480px] max-w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-5">
          <span className="text-[22px] font-bold">New Task</span>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-8 h-8 border-2 border-black rounded-full bg-white flex items-center justify-center font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block mb-1.5 text-[13px] text-[#444444]">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border-2 border-black rounded-xl px-3 py-2.5 shadow-[2px_3px_0_0_rgba(0,0,0,1)] text-sm bg-white mb-4"
          />

          <label className="block mb-1.5 text-[13px] text-[#444444]">Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 border-black rounded-xl px-3 py-2.5 shadow-[2px_3px_0_0_rgba(0,0,0,1)] text-sm bg-white mb-4"
          />

          <label className="block mb-1.5 text-[13px] text-[#444444]">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border-2 border-black rounded-xl px-3 py-2.5 shadow-[2px_3px_0_0_rgba(0,0,0,1)] text-sm bg-white mb-5"
          />

          <p className="font-bold mb-2.5">Microtasks</p>
          {microTasks.map((microTask, index) => (
            <div key={index} className="flex gap-2 mb-2.5 items-start">
              <div className="flex-1 flex flex-col gap-1.5">
                <input
                  type="text"
                  placeholder="Microtask title"
                  value={microTask.title}
                  onChange={(e) => handleMicroTaskChange(index, "title", e.target.value)}
                  className="w-full border-2 border-black rounded-[10px] px-2.5 py-2 shadow-[2px_3px_0_0_rgba(0,0,0,1)] text-[13px] bg-white"
                />
                <input
                  type="text"
                  placeholder="Microtask description"
                  value={microTask.description}
                  onChange={(e) => handleMicroTaskChange(index, "description", e.target.value)}
                  className="w-full border-2 border-black rounded-[10px] px-2.5 py-2 shadow-[2px_3px_0_0_rgba(0,0,0,1)] text-[13px] bg-white"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveMicroTask(index)}
                className="text-[#f26e56] font-bold cursor-pointer px-1 py-2"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddMicroTask}
            className="bg-transparent border-none text-[#5594f1] font-semibold text-sm cursor-pointer p-0 mb-5"
          >
            + Add microtask
          </button>

          {errorMessage && (
            <p className="text-sm text-[#f26e56] font-semibold mb-3 break-words">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#5594f1] text-white font-bold py-3 rounded-full border-2 border-black shadow-[2px_4px_0_0_rgba(0,0,0,1)] cursor-pointer text-[15px] disabled:opacity-60"
          >
            {submitting ? "Adding…" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function DashBoard() {
  const { tasks, filter, search, setSearch, refresh } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const counts = useMemo(() => {
    const c = { all: tasks.length, "on-going": 0, "in-progress": 0, completed: 0, urgent: 0 };
    tasks.forEach((t) => {
      c[t.status] = (c[t.status] || 0) + 1;
    });
    return c;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchesFilter = filter === "all" || t.status === filter;
      const matchesSearch =
        !q ||
        t.title?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const overviewStats = useMemo(() => {
    const totalMicro = tasks.reduce((a, t) => a + (t.microTask?.length || 0), 0);
    const doneMicro = tasks.reduce(
      (a, t) => a + (t.microTask?.filter((m) => m.completed).length || 0),
      0
    );
    const now = new Date();
    const in7 = new Date(now.getTime() + 7 * 86400000);
    const dueThisWeek = tasks.filter((t) => {
      if (t.status === "completed" || !t.dueDate) return false;
      const d = new Date(t.dueDate);
      return d >= now && d <= in7;
    }).length;

    return [
      { label: "Total tasks", value: tasks.length, color: "#000000" },
      { label: "Urgent", value: counts.urgent || 0, color: "#f26e56" },
      { label: "Due this week", value: dueThisWeek, color: "#000000" },
      {
        label: "Microtasks done",
        value: totalMicro ? `${doneMicro}/${totalMicro}` : "0/0",
        color: "#52c1c5",
      },
    ];
  }, [tasks, counts]);

  const dueSoon = useMemo(() => {
    return tasks
      .filter((t) => t.status !== "completed" && t.dueDate)
      .slice()
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 4)
      .map((t) => ({
        id: t._id,
        title: t.title,
        dueLabel: formatDate(t.dueDate),
        color: (STATUS_META[t.status] || STATUS_META["in-progress"]).color,
      }));
  }, [tasks]);

  const dashboardTitle =
    filter === "all" ? "Recent Tasks" : `${STATUS_META[filter]?.label || "Recent"} Tasks`;

  return (
    <div className="p-6 sm:p-8">
      <div className="flex justify-between items-center gap-4 flex-wrap mb-6">
        <span className="font-bold text-[30px]">Overview</span>
        <div className="flex gap-3 items-center flex-wrap">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-black rounded-full px-4 py-2 w-[220px] bg-white shadow-[2px_3px_0_0_rgba(0,0,0,1)] text-sm"
          />
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#5594f1] text-white font-bold px-5 py-2.5 rounded-full border-2 border-black shadow-[2px_4px_0_0_rgba(0,0,0,1)] cursor-pointer text-sm whitespace-nowrap"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
        {overviewStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border-2 border-black rounded-[18px] px-[18px] py-4 shadow-[2px_4px_0_0_rgba(0,0,0,1)]"
          >
            <p className="mb-2 text-xs font-semibold text-[#999999]">{stat.label}</p>
            <p className="text-[28px] font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
        <div>
          <p className="font-bold text-xl mb-4">{dashboardTitle}</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
            {filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
          {filteredTasks.length === 0 && (
            <p className="text-sm text-[#999999] mt-4">No tasks match your filters.</p>
          )}
        </div>

        <div className="bg-white border-2 border-black rounded-[20px] p-[18px] shadow-[2px_4px_0_0_rgba(0,0,0,1)] lg:sticky lg:top-8">
          <p className="font-bold text-base mb-3.5">Due soon</p>
          {dueSoon.map((t) => (
            <div
              key={t.id}
              onClick={() => router.push(`/dashboard/task/${t.id}`)}
              className="flex items-center gap-2.5 py-2.5 border-b border-[#eeeeee] last:border-b-0 cursor-pointer"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: t.color }}
              />
              <div className="min-w-0">
                <p className="m-0 text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                  {t.title}
                </p>
                <p className="mt-0.5 text-xs text-[#999999]">{t.dueLabel}</p>
              </div>
            </div>
          ))}
          {dueSoon.length === 0 && (
            <p className="text-xs text-[#999999]">Nothing due soon.</p>
          )}
        </div>
      </div>

      <AddTaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreated={refresh}
      />
    </div>
  );
}
