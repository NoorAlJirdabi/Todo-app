import React, { useState } from 'react'
import TodoItem from './TodoItem'
import { api } from '../services/api'
import '../App.css'

const TodoList = ({ todos, fetchTodos }) => {
  const [draggedTodo, setDraggedTodo] = useState(null)

  const handleDragStart = (e, todo) => {
    setDraggedTodo(todo)
    e.currentTarget.classList.add('dragging')
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = async (e, targetTodo) => {
    e.preventDefault()
    if (!draggedTodo || draggedTodo._id === targetTodo._id) return

    // Get updated order
    const updatedTodos = [...todos]
    const draggedIndex = updatedTodos.findIndex(
      (t) => t._id === draggedTodo._id
    )
    const targetIndex = updatedTodos.findIndex((t) => t._id === targetTodo._id)

    // Swap positions
    const temp = updatedTodos[draggedIndex].position
    updatedTodos[draggedIndex].position = updatedTodos[targetIndex].position
    updatedTodos[targetIndex].position = temp

    // Sort and update backend
    updatedTodos.sort((a, b) => a.position - b.position)
    await api.put('/todos/reorder', {
      order: updatedTodos.map((todo, index) => ({
        id: todo._id,
        position: index
      }))
    })

    fetchTodos()
  }

  return (
    <div className="todo-list">
      {todos
        .sort((a, b) => a.position - b.position)
        .map((todo) => (
          <div
            key={todo._id}
            className="todo-item"
            draggable
            onDragStart={(e) => handleDragStart(e, todo)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, todo)}
            onDragEnd={(e) => e.currentTarget.classList.remove('dragging')}
          >
            <TodoItem todo={todo} fetchTodos={fetchTodos} />
          </div>
        ))}
    </div>
  )
}

export default TodoList
