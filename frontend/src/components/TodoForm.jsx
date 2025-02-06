import React, { useState } from 'react'
import { api } from '../services/api'
import '../App.css'

const TodoForm = ({ fetchTodos }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/todos', { title, description })
    fetchTodos()
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default TodoForm
