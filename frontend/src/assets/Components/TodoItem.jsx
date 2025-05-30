import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext.js";
import { motion } from "framer-motion";

function TodoItem({ todo }) {
  if (!todo) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
        <span className="ml-3 text-gray-400 text-lg">Loading...</span>
      </div>
    );
  }

  const [isTodoEditable, setIsTodoEditable] = useState(todo.isEditable);
  const [task, settask] = useState(todo.todo);
  const [completed, setCompleted] = useState(todo.Completed);
  const { updateTodo, toggleCompleted, deleteTodo } = useTodo();

  // Variants for the todo container animation
  const containerVariants = {
    incomplete: {
      background: "linear-gradient(to right, rgba(30, 41, 59, 0.5), rgba(55, 65, 81, 0.5))",
      scale: 1,
      transition: { duration: 0.3 },
    },
    complete: {
      background: "linear-gradient(to right, rgba(6, 78, 59, 0.3), rgba(20, 83, 45, 0.3))",
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  // Variants for the checkbox animation
  const checkboxVariants = {
    incomplete: { scale: 1, borderColor: "#4b5563" },
    complete: { scale: 1.2, borderColor: "#10b981", backgroundColor: "#10b981" },
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ x: 0, opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ x: 300, opacity: 0, scale: 0.7, rotate: 10, transition: { duration: 0.4, ease: "easeInOut" } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className={`group relative flex items-center justify-between p-5 rounded-xl border transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-lg my-4 ${
          completed
            ? "border-emerald-700/50 shadow-emerald-900/20"
            : "border-gray-700/50 shadow-gray-900/20"
        }`}
        variants={containerVariants}
        animate={completed ? "complete" : "incomplete"}
      >
        {/* Left side - Checkbox and Input */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative">
            <motion.input
              type="checkbox"
              className={`w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 ${
                completed ? "bg-emerald-500" : "bg-transparent"
              }`}
              checked={completed}
              onChange={(e) => {
                setCompleted((prev) => !prev);
                toggleCompleted(todo._id);
              }}
              variants={checkboxVariants}
              animate={completed ? "complete" : "incomplete"}
            />
          </div>

          <div className="flex-1">
            <motion.input
              type="text"
              className={`w-full bg-transparent border rounded-lg px-4 py-2 text-lg font-medium transition-all duration-200 ${
                !isTodoEditable
                  ? "border-blue-500/50 bg-gray-700/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                  : "border-transparent text-gray-300 cursor-default"
              } ${completed ? "line-through text-gray-500" : "text-gray-200"}`}
              value={task}
              onChange={(e) => {
                settask(e.target.value);
                const newtodo = {
                  ...todo,
                  todo: e.target.value,
                };
                updateTodo(todo._id, newtodo);
              }}
              readOnly={isTodoEditable}
              placeholder="Enter your task..."
              animate={{
                textDecoration: completed ? "line-through" : "none",
                color: completed ? "#9ca3af" : "#e5e7eb",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Right side - Action Buttons */}
        <div className="flex items-center gap-3 ml-4">
          <button
            className={`
              ${
                !completed
                  ? "flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200"
                  : ""
              } ${
                completed
                  ? "bg-gray-600 border-gray-600 cursor-not-allowed opacity-50"
                  : "bg-blue-600/20 border-blue-500/50 hover:bg-blue-600/40 hover:border-blue-400 hover:scale-110"
              }`}
            onClick={() => {
              setIsTodoEditable((prev) => !prev);
            }}
            disabled={completed}
            title={isTodoEditable ? "Save" : "Edit"}
          >
            <span className="text-lg">
              {!completed ? (isTodoEditable ? "✏️" : "💾") : ""}
            </span>
          </button>

          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-600/20 border border-red-500/50 hover:bg-red-600/40 hover:border-red-400 hover:scale-110 transition-all duration-200"
            onClick={() => deleteTodo(todo._id)}
            title="Delete task"
          >
            <span className="text-lg">🗑️</span>
          </button>
        </div>

        {/* Completion indicator */}
        {completed && (
          <motion.div
            className="absolute -top-2 -right-2 bg-emerald-500 text-white w-8 flex justify-center rounded-full p-1"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <span className="text-xs">✓</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default TodoItem;