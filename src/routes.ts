import express from 'express'
import task from './controller/task'
import { CreateTaskDto, IdParam, UpdateTaskDto, ReplaceTaskDto, GetAllTaskDto } from './dto/task.dto'
import validateRequest from './middlewares/validationResults'

const router = express.Router()

router.route('/tasks')

  /**
   * POST /tasks
   * @tag tasks
   * @summary Creates a task.
   * @bodyComponent {CreateUpdateBody}
   * @bodyRequired
   * @response 201 - Created
   * @responseContent {Task} 201.application/json
   * @response 400 - Validation error
   */
  .post(validateRequest(CreateTaskDto, 'body'),
    task.createTask)

  /**
   * GET /tasks
   * @tag tasks
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
   * GET /tasks/{id}
   * @tag tasks
   * @summary Get task by id
   * @paramComponent {taskId}
   * @response 200 - The list of the tasks
   * @responseContent {Task} 200.application/json
   * @response 400 - Invalid task id
   * @response 404 - Task not found
   */
  .get(task.getTaskById)

  /**
   * PUT /tasks/{id}
   * @tag tasks
   * @summary Replace task by id
   * @paramComponent {taskId}
   * @bodyComponent {CreateUpdateBody}
   * @bodyRequired
   * @response 200 - Task was updated
   * @responseContent {Task} 200.application/json
   * @response 400 - Invalid task id / Validation error
   * @response 404 - Task not found
   */
  .put(validateRequest(ReplaceTaskDto, 'body'), task.replaceTask)

  /**
   * PATCH /tasks/{id}
   * @tag tasks
   * @summary Update task by id
   * @paramComponent {taskId}
   * @bodyComponent {CreateUpdateBody}
   * @bodyRequired
   * @response 200 - Task was updated
   * @responseContent {Task} 200.application/json
   * @response 400 - Invalid task id / Validation error
   * @response 404 - Task not found
   */
  .patch(validateRequest(UpdateTaskDto, 'body'), task.updateTask)

  /**
   * DELETE /tasks/{id}
   * @tag tasks
   * @summary Delete task by id
   * @paramComponent {taskId}
   * @response 204 - No content
   * @response 400 - Invalid task id
   * @response 404 - Task not found
   */
  .delete(task.deleteTask)

export default router
