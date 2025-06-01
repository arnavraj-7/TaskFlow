import React, { useEffect, useRef, useState } from "react";
import { easeIn, easeOut, motion } from "motion/react"; 
import {
  useAuth,
  SignOutButton,
  UserButton,
  UserProfile,
  useUser
} from "@clerk/clerk-react";
import { TodoProvider } from "./assets/Contexts/TodoContext.js";
import TodoForm from "./assets/Components/TodoForm.jsx";
import "./index.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toaster } from "./lib/toastprovider.js";


const App = ({ loaded,handleLoading }) => {
  const [todos, setTodos] = useState([]);
  const Navigate = useNavigate();
  const { getToken, userId, } = useAuth();
  const {user} = useUser();
  const [showUserProfile, setShowUserProfile] = useState(false);

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        const token = await getToken();
        console.log(user.firstName);
        const res1 = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/todos/create/${userId}/${user?.firstName}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
       const response = await res1.json();
        if (res1.status == 201 || res1.status == 400) {
          console.log("User creation request sent successfully.",response);
        } else {
          throw new Error("Something went wrong");
        }
        // Fetch all todos for the user
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/todos/AllToDo/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (!data) {
          throw new Error("No data received from the server");
        }
        handleLoading();
        return data;
      } catch (error) {
        console.error("Error fetching todos:", error);
        return { Alltodos: [] }; // Return an empty array if there's an error
      }
    };
    fetchtodos().then((data) => {
      setTodos(data.Alltodos || []); // Ensure todos is an array
      console.log("Fetched todos:", data);
    });
  }, []);
  // useEffect(() => {
  //   console.log("Todos state updated:", todos);
  // }, [todos]);
  useEffect(()=>{
    if(loaded){
      toaster("Welcome to TaskFlow! 🚀", "info");
    }
  },[loaded])

  const addTodo = async (todo) => {
    //Save the todo in the backend
    try {
      const token = await getToken();
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/todos/AllToDo/${userId}`,
        {
          body: JSON.stringify(todo),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await res.json();
      if (!response.todo) {
        throw new Error("Failed to add todo");
      }
      const addedTodo = response;
      toaster("Task added successfully! 🎉", "success");
      setTodos((prev) => [addedTodo, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (_id, todo) => {
    // Update the todo in the backend
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/todos/AllToDo/${userId}/${_id}`,
      {
        body: JSON.stringify(todo),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    const updatedTodo = await res.json();
    
   
    console.log("Updated todo:", updatedTodo);
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo._id === _id ? updatedTodo : prevTodo))
    );
  };
  const deleteTodo = async (_id) => {
    const token = await getToken();
    setTodos((prev) => prev.filter((todo) => todo._id !== _id));
    // Delete the todo in the backend
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/todos/AllToDo/${userId}/${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const deletedTodo = await res.json();
    toaster("Task deleted! 🗑️", "error");
    console.log("Removed todo:", deletedTodo);
  };

  const toggleCompleted = async (_id) => {
    // Toggle the completed status in the backend
    let updatedTodo = todos.find((todo) => todo._id === _id);
    updatedTodo.Completed = !updatedTodo.Completed;
    try {
      const token = await getToken();
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/todos/AllToDo/${userId}/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedTodo),
        }
      );
      updatedTodo = await res.json();
      if(updatedTodo.Completed){
        toaster("Task completed! ✅", "purple");
      }else{
        toaster("Task marked as pending! ⏳", "info");
      }
      setTodos((prev) => [
        ...prev.map((todo) => (todo._id === _id ? updatedTodo : todo)),
      ]);
    } catch (error) {
      console.error("Error toggling completed status:", error);
    }
  };
  if (Array.isArray(todos) == null) {
    return;
  }
  return (
    <>
      {loaded ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {/* Enhanced Navbar with better animations */}
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: easeOut,
              delay: 0.1,
            }}
            className="bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-800/95 border-b border-gray-700/30 shadow-xl backdrop-blur-md sticky top-0 z-40"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                {/* Logo/Brand with animation */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-center"
                >
                  <div className="flex-shrink-0 cursor-pointer" onClick={()=>Navigate("/")}>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      TaskFlow
                    </h2>
                  </div>
                </motion.div>

                {/* User Section with staggered animations */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center space-x-3"
                >
                  {/* Welcome Message */}
                  <div className="hidden md:block">
                    <span className="text-gray-300 text-sm font-medium">
                      Hi {user?.firstName || user?.username || ""}
                    </span>
                  </div>

                  {/* Compact Profile Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserProfile(true)}
                    className="px-3 py-1.5 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Profile
                  </motion.button>

                  {/* Enhanced User Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox:
                            "w-8 h-8 ring-2 ring-blue-400/40 ring-offset-1 ring-offset-gray-900 shadow-lg",
                          userButtonPopoverCard:
                            "bg-gray-900/95 backdrop-blur-sm text-white border border-gray-700/50 shadow-2xl",
                          userButtonPopoverText: "text-gray-300",
                          userButtonPopoverActionButton:
                            "text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200",
                          userButtonPopoverActionButtonIcon: "text-gray-400",
                        },
                        variables: {
                          colorPrimary: "#6366f1",
                          colorBackground: "#1e293b",
                          colorText: "#fff",
                        },
                      }}
                      afterSignOutUrl="/"
                    />
                  </motion.div>

                  {/* Compact Sign Out Button */}
                  <SignOutButton>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-rose-600/80 to-red-600/80 hover:from-rose-500 hover:to-red-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-red-500/20"
                    >
                      <span className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </span>
                    </motion.button>
                  </SignOutButton>
                </motion.div>
              </div>
            </div>
          </motion.nav>

          {/* Enhanced User Profile Modal */}
          {showUserProfile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setShowUserProfile(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="relative bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-4 right-4 z-10">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowUserProfile(false)}
                    className="p-2 bg-gray-800/80 hover:bg-gray-700/80 text-gray-400 hover:text-white rounded-full transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
                <UserProfile
                  appearance={{
                    elements: {
                      rootBox: "bg-transparent",
                      card: "bg-transparent border-0 shadow-none",
                      headerTitle: "text-white text-2xl font-bold",
                      headerSubtitle: "text-gray-400",
                      socialButtonsBlockButton:
                        "bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50",
                      formButtonPrimary:
                        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500",
                      formFieldInput:
                        "bg-gray-800/50 border border-gray-700/50 text-white",
                      formFieldLabel: "text-gray-300",
                      identityPreview:
                        "bg-gray-800/30 border border-gray-700/50",
                      identityPreviewText: "text-gray-300",
                      identityPreviewEditButton:
                        "text-blue-400 hover:text-blue-300",
                    },
                    variables: {
                      colorPrimary: "#6366f1",
                      colorBackground: "transparent",
                      colorText: "#fff",
                      colorInputBackground: "#374151",
                      colorInputText: "#fff",
                    },
                  }}
                />
              </motion.div>
            </motion.div>
          )}

          <TodoProvider
            value={{ todos, addTodo, deleteTodo, updateTodo, toggleCompleted }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: easeOut,
                delay: 0.2,
              }}
              className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 min-h-screen py-10 px-4 font-raleway"
            >
              <div className="w-full max-w-4xl mx-auto">
                {/* Enhanced Header Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: easeOut,
                    delay: 0.4,
                  }}
                  className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 shadow-2xl rounded-2xl px-8 py-8 mb-8"
                >
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: easeOut,
                      delay: 0.6,
                    }}
                    className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    Task Manager
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: easeOut,
                      delay: 0.7,
                    }}
                    className="text-gray-400 text-center text-lg mb-8"
                  >
                    Organize your life, one task at a time
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: easeOut,
                      delay: 0.8,
                    }}
                    className="mb-8"
                  >
                    <TodoForm />
                  </motion.div>

                  {/* Enhanced Navigation Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: easeOut,
                      delay: 0.9,
                    }}
                    className="flex flex-wrap justify-center gap-4 md:gap-6"
                  >
                    {[
                      { 
                        label: "📋 All Tasks", 
                        route: "", 
                        gradient: "from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500",
                        delay: 1.0
                      },
                      { 
                        label: "✅ Completed", 
                        route: "done", 
                        gradient: "from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500",
                        delay: 1.1
                      },
                      { 
                        label: "⏰ Pending", 
                        route: "notdone", 
                        gradient: "from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500",
                        delay: 1.2
                      }
                    ].map((button, index) => (
                      <motion.button
                        key={button.route}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: easeOut,
                          delay: button.delay,
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className={`group relative px-6 py-3 bg-gradient-to-r ${button.gradient} text-white font-semibold rounded-xl shadow-lg transition-all duration-300 ease-out`}
                        onClick={() => Navigate(button.route)}
                      >
                        <span className="flex items-center gap-2 text-base">
                          {button.label}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Enhanced Content Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: easeOut,
                    delay: 1.3,
                  }}
                  className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 shadow-2xl rounded-2xl px-8 py-6"
                >
                  <Outlet />
                </motion.div>
              </div>
            </motion.div>
          </TodoProvider>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
};

export default App;