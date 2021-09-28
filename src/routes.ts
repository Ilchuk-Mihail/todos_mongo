import express from 'express'
import task from './controller/task'
import { CreateTaskDto, GetDeleteTaskDto, UpdateTaskDto } from './dto/task.dto'
// import checkIdValidity from './middlewares/checkIdValidity'
import validateRequest from './middlewares/validationResults'

const router = express.Router()

// router.param('id', checkIdValidity)

router.route('/tasks')
  .post(validateRequest(CreateTaskDto),
    task.createTask)
  .get(task.getAllTasks)

router.route('/tasks/:id')
  .get(validateRequest(GetDeleteTaskDto),
    task.getTaskById)
  .put(validateRequest(UpdateTaskDto),
    task.replaceTask)
  .patch(validateRequest(UpdateTaskDto),
    task.updateTask)
  .delete(validateRequest(GetDeleteTaskDto),
    task.deleteTask)

export default router
