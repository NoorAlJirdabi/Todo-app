import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setAuthToken } from '../services/api'
import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'
import '../App.css'

const Home = () => {
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos')
      setTodos(res.data)
    } catch (err) {
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const logout = () => {
    setAuthToken(null)
    navigate('/login')
  }

  return (
    <div>
      <h1>TODO List</h1>
      <button onClick={logout} className="logout">
        Logout
      </button>
      <TodoForm fetchTodos={fetchTodos} />
      <TodoList todos={todos} fetchTodos={fetchTodos} />
    </div>
  )
}

export default Home
