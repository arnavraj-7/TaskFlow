import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext.js";
import { Link, useNavigate } from "react-router-dom";

function TodoForm() {
    
   const {addTodo}=useTodo()
   const Navigate=useNavigate()
   const [task,settask]=useState("")

   const handleSubmit=async (e)=>{
       e.preventDefault();
    const newTodo={
        todo:task,
        Completed:false,
        isEditable:true,
    }
        addTodo(newTodo).then(()=>{
        console.log("Todo added successfully");
        settask("");
        });
    } 

    
    return (
      <form className="flex gap-0 w-full" onSubmit={handleSubmit}>
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Add a new task..."
          className="w-full bg-gray-700/50 border border-gray-600/50 rounded-l-xl px-6 py-4 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-lg"
          value={task}
          onChange={(e) => {
            settask(e.target.value)
          }}
        />
        {/* Input focus glow effect */}
        <div className="absolute inset-0 rounded-l-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
      </div>
      
      <button 
        type="submit" 
        disabled={!task.trim()}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-r-xl transition-all duration-300 ease-out transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
      >
        <span className="flex items-center gap-2 text-lg">
          <span>Add</span>
          <span>➕</span>
        </span>
      </button>
    </form>
    );
}

export default TodoForm;