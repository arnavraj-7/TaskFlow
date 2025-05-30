import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Check, Trash2, Menu, X, ArrowRight } from 'lucide-react';
import TodoForm from './TodoForm';
import AllToDo from './AllToDo';
import { useNavigate } from 'react-router-dom';
import { TodoProvider } from '../Contexts/TodoContext';

const LandingPage = () => {
    const Navigate=useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [todos, setTodos] = useState([
    { _id: 1, todo: "Learn React", Completed: true,isEditable:false },
    { _id: 2, todo: "Learn Express", Completed: true,isEditable:false },
    { _id: 3, todo: "Build my todo app", Completed: false,isEditable:true },
    { _id: 4, todo: "Deploy to production", Completed: false,isEditable:true }
  ]);

   const addTodo = async(todo) => {
        setTodos((prev)=>[todo,...prev]);
    }

  const updateTodo = (_id, todo) => {
  setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo._id === _id ? todo : prevTodo))
    );
 
  };

  const deleteTodo = (_id) => {
    setTodos((prev) => prev.filter((todo) => todo._id !== _id));
    
  
  }


  const toggleCompleted =(_id) => {

    let updatedTodo = todos.find((todo)=>todo._id===_id);
    updatedTodo.Completed = !updatedTodo.Completed;
      setTodos((prev) =>
      [...prev.map((todo)=>todo.id===_id?updateTodo:todo)]
      );
    }


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTask = (id) => {
    setDemoTasks(tasks => 
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setDemoTasks(tasks => tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl animate-bounce delay-500"></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 border border-blue-500/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 border border-purple-500/20 rotate-12 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold">📋</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800/50"
              onClick={()=>{Navigate("/Login")}}>
                Sign In
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              onClick={()=>{Navigate("/SignUp")}}>
                Sign Up Free
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-800/95 backdrop-blur-md border-t border-gray-700/50">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700/50"
                onClick={()=>{Navigate("/Login")}}
                >
                  Sign In
                </button>
                <button className="block w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 rounded-lg font-semibold"
                onClick={()=>{Navigate("/SignUp")}}>
                  Sign Up Free
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-35 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 ">
            
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Simple Todo List
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Made Easy
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                A clean, straightforward todo app. Add tasks, check them off, delete when done. No complexity, just productivity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                onClick={()=>Navigate("/signup")}>
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Simple Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">➕</div>
                  <h3 className="text-white font-semibold text-sm">Add Tasks</h3>
                </div>
                
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">✅</div>
                  <h3 className="text-white font-semibold text-sm">Mark Complete</h3>
                </div>
                
                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🗑️</div>
                  <h3 className="text-white font-semibold text-sm">Delete Tasks</h3>
                </div>
              </div>
            </div>

            {/* Right Side - Live Demo */}
            <div className='flex flex-col gap-y-5 justify-center items-center'>
          <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleCompleted }}>
            <TodoForm/>
            <AllToDo/>
          </TodoProvider>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Why TaskFlow Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Why Choose
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> TaskFlow?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Simple & Clean</h3>
              <p className="text-gray-400">No overwhelming features or complicated setup. Just a clean, intuitive interface for managing your tasks.</p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-400">Built for speed. Add, complete, and delete tasks instantly without any lag or delays.</p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <div className="text-3xl mb-4">🆓</div>
              <h3 className="text-xl font-bold mb-3">Completely Free</h3>
              <p className="text-gray-400">No subscriptions, no premium features, no hidden costs. Just a free, reliable todo app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Start managing your tasks today. It's free and takes less than a minute to get started.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            onClick={()=>Navigate("/SignUp")}>
              Sign Up Free
            </button>
            <button className="text-gray-300 hover:text-white transition-colors px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800/50"
            onClick={()=>{Navigate("/Login")}}>
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 px-4 border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-sm font-bold">📋</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
          <p className="text-gray-400">
            A simple, free todo app for getting things done.
          </p>
        </div>
      </footer>

      {/* Decorative Bottom Gradient */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-30"></div> */}
    </div>
  );
}

export default LandingPage;