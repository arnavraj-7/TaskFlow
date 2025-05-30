import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext.js";
import TodoItem from "./TodoItem.jsx";
function Done({ todo }) {
    const {todos} = useTodo()
       
      const todos_C=todos.filter((todo)=>todo.Completed==true)

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          Completed Tasks
        </h2>
        <div className="bg-emerald-900/30 border border-emerald-700/50 px-4 py-2 rounded-full">
          <span className="text-emerald-300 font-medium">
            {todos_C.length} completed
          </span>
        </div>
      </div>

      {/* Completed Tasks List */}
      <div className="space-y-3">
        {todos_C.length > 0 ? (
          todos_C.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No completed tasks yet!
            </h3>
            <p className="text-gray-500 text-lg">
              Complete some tasks to see them here
            </p>
          </div>
        )}
      </div>

      {/* Achievement Section */}
      {todos_C.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <div className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 border border-emerald-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-xl font-bold text-emerald-400 mb-1">
              Great Job!
            </h3>
            <p className="text-gray-400">
              You've completed {todos_C.length} {todos_C.length === 1 ? 'task' : 'tasks'}. Keep up the momentum!
            </p>
          </div>
        </div>
      )}
    </div>

  )
}

export default Done;
