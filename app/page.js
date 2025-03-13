import TaskCard from "./components/task_card";

export default function Home() {
  const tasks = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 1", "Task 2", "Task 3", "Task 4", "Task 5"];

  return (
    <div className="bg-[#f6f6f6] h-screen w-screen flex flex-col sm:flex-row overflow-x-hidden">
      <div className="px-2 sm:px-5 sm:pt-5 sm:h-[100%] sm:w-[80%]">
        <span className="font-bold text-3xl">Recent Tasks</span>
        <div className="flex flex-wrap pt-1 gap-4 max-w-full h-full">
          {tasks.map((task, index) => (
            <TaskCard key={index} task={task} />
          ))}
        </div>
      </div>

    </div>
  );
}
