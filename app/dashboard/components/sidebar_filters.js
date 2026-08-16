"use client";

import { useRouter } from "next/navigation";
import { STATUS_META, useTasks } from "../tasks_context";

const CHIPS = [
  { key: "all", label: "All tasks", color: "#000000" },
  { key: "on-going", label: STATUS_META["on-going"].label, color: STATUS_META["on-going"].color },
  { key: "in-progress", label: STATUS_META["in-progress"].label, color: STATUS_META["in-progress"].color },
  { key: "completed", label: STATUS_META["completed"].label, color: STATUS_META["completed"].color },
  { key: "urgent", label: STATUS_META["urgent"].label, color: STATUS_META["urgent"].color },
];

export default function SidebarFilters() {
  const { tasks, filter, setFilter } = useTasks();
  const router = useRouter();

  const counts = { all: tasks.length, "on-going": 0, "in-progress": 0, completed: 0, urgent: 0 };
  tasks.forEach((t) => {
    counts[t.status] = (counts[t.status] || 0) + 1;
  });

  const handleClick = (key) => {
    setFilter(key);
    router.push("/dashboard");
  };

  return (
    <div>
      <p className="text-[11px] tracking-wide text-[#999999] font-semibold mb-2.5">
        FILTER BY STATUS
      </p>
      {CHIPS.map((c) => {
        const active = filter === c.key;
        return (
          <div
            key={c.key}
            onClick={() => handleClick(c.key)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer mb-2 border-2 transition-colors ${
              active ? "border-black bg-[#f6f6f6]" : "border-transparent hover:bg-[#f6f6f6]"
            }`}
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold text-black">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: c.color }}
              />
              {c.label}
            </span>
            <span className="text-xs font-bold text-black">{counts[c.key] || 0}</span>
          </div>
        );
      })}
    </div>
  );
}
