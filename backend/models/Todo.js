const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }, // Links to the user
    title: { type: String, required: true },
    description: { type: String },
    position: { type: Number, default: 0 } // Used for ordering
  },
  { timestamps: true }
)

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo
