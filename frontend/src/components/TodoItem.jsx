import React, { useState } from 'react'
import { api } from '../services/api'
import '../App.css'

const TodoItem = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)

  const deleteTodo = async () => {
    await api.delete(`/todos/${todo._id}`)
    fetchTodos()
  }

  const saveTodo = async () => {
    await api.put(`/todos/${todo._id}`, { title, description })
    setIsEditing(false)
    fetchTodos()
  }

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={saveTodo}>Save</button>
        </>
      ) : (
        <>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={deleteTodo}>Delete</button>
        </>
      )}
    </div>
  )
}

export default TodoItem
