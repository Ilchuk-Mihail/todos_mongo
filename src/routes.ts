import express from 'express'
import task from './controller/task'

const router = express.Router()

router.route('/tasks')
  .post(task.createTask)
  .get(task.getAllTasks)

router.route('/tasks/:id')
  .get(task.getTaskById)
  .put(task.updateTask)
  .delete(task.deleteTask)

export default router
