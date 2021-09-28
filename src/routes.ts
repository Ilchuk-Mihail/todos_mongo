import express from 'express'
import task from './controller/task'
import { CreateTaskDto, GetDeleteTaskDto, IdParam, UpdateTaskDto } from './dto/task.dto'
// import checkIdValidity from './middlewares/checkIdValidity'
import validateRequest from './middlewares/validationResults'

const router = express.Router()

// router.param('id', checkIdValidity)

router.route('/tasks')
  .post(validateRequest(CreateTaskDto, 'body'),
    task.createTask)
  .get(task.getAllTasks)

router.route('/tasks/:id')
  .all(validateRequest(IdParam, 'params'))
  .get(task.getTaskById)
  .put(validateRequest(UpdateTaskDto, 'body'), task.replaceTask)
  .patch(validateRequest(UpdateTaskDto, 'body'), task.updateTask)
  .delete(task.deleteTask)

export default router
