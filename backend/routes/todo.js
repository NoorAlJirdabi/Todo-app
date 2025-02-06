const router = require('express').Router()
const controller = require('../controllers/todo')
const middleware = require('../middleware/index')

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getTodos
)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.addTodo
)
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteTodo
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateTodo
)
router.put(
  '/reorder',
  middleware.stripToken,
  middleware.verifyToken,
  controller.reorderTodos
)

module.exports = router
