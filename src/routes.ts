import express from 'express'
import task from './controller/task'
import taskMiddleware from './middlewares/task'

const router = express.Router()

router.param('id', taskMiddleware.checkIdValidity)

router.route('/tasks')
  .post(task.createTask)
  .get(task.getAllTasks)

router.route('/tasks/:id')
  .get(task.getTaskById)
  .put(task.replaceTask)
  .patch(task.updateTask)
  .delete(task.deleteTask)

export default router
