const Todo = require('../models/Todo')

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({ position: 1 })
    res.json(todos)
  } catch (error) {
    res.status(500).json({ msg: 'Error retrieving todos' })
  }
}

const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body
    const count = await Todo.countDocuments({ userId: req.user.id })

    const newTodo = await Todo.create({
      userId: req.user.id,
      title,
      description,
      position: count // Adds new todo at the last position
    })

    res.status(201).json(newTodo)
  } catch (error) {
    res.status(500).json({ msg: 'Error adding todo' })
  }
}

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    await Todo.deleteOne({ _id: id, userId: req.user.id })
    res.json({ msg: 'Todo deleted' })
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting todo' })
  }
}

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description } = req.body

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description },
      { new: true }
    )

    res.json(updatedTodo)
  } catch (error) {
    res.status(500).json({ msg: 'Error updating todo' })
  }
}

const reorderTodos = async (req, res) => {
  try {
    const { order } = req.body
    console.log('Received Reorder Request:', order)

    for (let item of order) {
      console.log(`Updating Todo ID: ${item.id} to Position: ${item.position}`)

      const updated = await Todo.updateOne(
        { _id: item.id, userId: req.user.id },
        { $set: { position: item.position } }
      )

      if (updated.modifiedCount === 0) {
        console.log(`Todo ID: ${item.id} not found.`)
        return res.status(400).json({ msg: `Todo ${item.id} not found.` })
      }
    }

    res.json({ msg: 'Reordered successfully' })
  } catch (error) {
    console.error('Reorder Error:', error)
    res.status(500).json({ msg: 'Error updating todo' })
  }
}

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  reorderTodos
}
