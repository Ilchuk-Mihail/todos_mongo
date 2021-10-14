import express from 'express'
import task from './controller/task'
import { CreateTaskDto, IdParam, UpdateTaskDto, ReplaceTaskDto, GetAllTaskDto } from './dto/task.dto'
import validateRequest from './middlewares/validationResults'

const router = express.Router()

router.route('/tasks')
  /**
   * POST /tasks
   * @summary Creates a task.
   * @bodyContent {CreateUpdateTask} application/json
   * @bodyRequired
   * @response 201 - Created
   * @responseContent {Task} 201.application/json
   * @response 400 - Validation error
   */
  .post(validateRequest(CreateTaskDto, 'body'),
    task.createTask)
  /**
   * GET /tasks
   * @summary Get all tasks
   * @queryParam {integer} [skip=0] - The number of items to skip before starting to collect the result
   * @queryParam {integer} [limit=20] - The numbers of items to return
   * @queryParam {string} [status] - Filter items by status
   * @queryParam {string} [importance] - Filter items by importance
   * @response 200 - The list of the tasks
   * @responseContent {TasksResponse} 200.application/json
   */
  .get(validateRequest(GetAllTaskDto, 'query'),
    task.getAllTasks)

router.route('/tasks/:id')
  .all(validateRequest(IdParam, 'params'))
  /**
   * GET /tasks/{taskId}
   * @summary Get task by id
   * @pathParam {string} taskId - Mongo ID of the task to get.
   * @response 200 - The list of the tasks
   * @responseContent {Task} 200.application/json
   * @response 400 - Invalid task id
   * @response 404 - Task not found
   */
  .get(task.getTaskById)
  /**
   * PUT /tasks/{taskId}
   * @summary Replace task by id
   * @pathParam {string} taskId - Mongo ID of the task to update
   * @bodyContent {CreateUpdateTask} application/json
   * @bodyRequired
   * @response 200 - Task was updated
   * @responseContent {Task} 200.application/json
   * @response 400 - Invalid task id / Validation error
   * @response 404 - Task not found
   */
  .put(validateRequest(ReplaceTaskDto, 'body'), task.replaceTask)
  /**
   * PATCH /tasks/{taskId}
   * @summary Update task by id
   * @pathParam {string} taskId - Mongo ID of the task to update
   * @bodyContent {CreateUpdateTask} application/json
   * @bodyRequired
   * @response 200 - Task was updated
   * @responseContent {Task} 200.application/json
   * @response 400 - Invalid task id / Validation error
   * @response 404 - Task not found
   */
  .patch(validateRequest(UpdateTaskDto, 'body'), task.updateTask)
  /**
   * DELETE /tasks/{taskId}
   * @summary Delete task by id
   * @pathParam {string} taskId - Mongo ID of the task to delete.
   * @response 204 - No content
   * @responseContent 204.application/json
   * @response 400 - Invalid task id
   * @response 404 - Task not found
   */
  .delete(task.deleteTask)

export default router
