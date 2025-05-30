import React from 'react'
import { useTodo } from '../Contexts/TodoContext.js'
import TodoItem from './TodoItem'
import { SignOutButton,UserButton } from '@clerk/clerk-react';
import { AnimatePresence } from 'framer-motion'
const AllToDo = ({demotodos}) => {
  let todos=[];
  if(demotodos){
    todos=demotodos;
  }
  else{
    todos=useTodo().todos
  }
  return (
    <>
        <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          All Tasks
        </h2>
        <div className="bg-gray-700/50 px-4 py-2 rounded-full">
          <span className="text-gray-300 font-medium">
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <AnimatePresence>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No tasks yet!
            </h3>
            <p className="text-gray-500 text-lg">
              Add your first task to get started
            </p>
          </div>
        )}
        </AnimatePresence>
      </div>

      {/* Stats Footer */}
      {todos.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-400">
                {todos.filter(todo => todo.Completed).length}
              </div>
              <div className="text-gray-400 text-sm">Completed</div>
            </div>
            <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-amber-400">
                {todos.filter(todo => !todo.Completed).length}
              </div>
              <div className="text-gray-400 text-sm">Remaining</div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )

}

export default AllToDo
