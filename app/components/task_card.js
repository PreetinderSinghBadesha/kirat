export default function TaskCard({ task }) {
    return (
        <div className="bg-[#ffffff] w-full max-w-full sm:w-[30%] sm:h-[20%] p-5 border-2 border-black rounded-2xl shadow-[2px_4px_0_0_rgba(0,0,0,1)]">
            {task}
        </div>
    );
}