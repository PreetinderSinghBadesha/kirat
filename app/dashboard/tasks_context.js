"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const refresh = useCallback(() => {
    setLoading(true);
    return fetch("/api/tasks/user_task")
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks || []))
      .catch((error) => console.error("Error fetching tasks:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <TasksContext.Provider
      value={{ tasks, loading, filter, setFilter, search, setSearch, refresh }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return ctx;
}

export const STATUS_META = {
  "on-going": { label: "On going", color: "#5594f1" },
  "in-progress": { label: "In Progress", color: "#ffc446" },
  completed: { label: "Completed", color: "#52c1c5" },
  urgent: { label: "Urgent", color: "#f26e56" },
};

export function formatDate(dateLike) {
  if (!dateLike) return "";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
