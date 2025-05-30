import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext.js";
import TodoItem from "./TodoItem.jsx";
function NotDone() {
    const {todos} = useTodo()
       
      const todos_NC=todos.filter((todo)=>todo.Completed==false)

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          Pending Tasks
        </h2>
        <div className="bg-amber-900/30 border border-amber-700/50 px-4 py-2 rounded-full">
          <span className="text-amber-300 font-medium">
            {todos_NC.length} pending
          </span>
        </div>
      </div>

      {/* Pending Tasks List */}
      <div className="space-y-3">
        {todos_NC.length > 0 ? (
          todos_NC.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-emerald-400 mb-2">
              All tasks completed!
            </h3>
            <p className="text-gray-400 text-lg">
              Amazing work! You've finished everything on your list
            </p>
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-900/20 to-green-900/20 border border-emerald-700/50 rounded-xl">
              <div className="text-2xl mb-2">✨</div>
              <p className="text-emerald-300 font-medium">
                Time to add some new goals!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Motivation Section */}
      {todos_NC.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-700/50 rounded-xl p-6 text-center">
            <div className="text-2xl mb-2">💪</div>
            <h3 className="text-lg font-semibold text-amber-400 mb-1">
              Stay Focused!
            </h3>
            <p className="text-gray-400">
              {todos_NC.length} {todos_NC.length === 1 ? 'task' : 'tasks'} remaining. You've got this!
            </p>
          </div>
        </div>
      )}
    </div>
  )

  
}

export default NotDone;
