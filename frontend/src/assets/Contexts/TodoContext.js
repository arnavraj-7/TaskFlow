import React from 'react'
import {createContext,useContext} from "react"

 export const TodoContext=createContext(
    {
 todos:    [
    {todoID:"",todo:"",Completed:"",todoEditable:""}
],addTodo:(todo)=>{},deleteTodo:(id)=>{},updateTodo:(id,todo)=>{},toggleCompleted:()=>{
}
    }
)

 export const useTodo=()=>{
    return useContext(TodoContext)
 }


export const TodoProvider =TodoContext.Provider