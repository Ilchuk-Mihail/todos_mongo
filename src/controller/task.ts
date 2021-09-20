import { Request, Response, NextFunction } from 'express'
import TaskModel, { Task } from '../model/task'

export default {
  async createTask (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, importance, status } = req.body
      const newTask: Task = await TaskModel.create({
        title,
        description,
        importance,
        status
      })
      res.status(201).send(newTask)
    } catch (err) {
      next(err)
    }
  },

  async getAllTasks (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tasks: Task[] = await TaskModel.find().lean()
      res.status(200).send({
        results: tasks.length,
        tasks
      })
    } catch (err) {
      next(err)
    }
  },

  async getTaskById (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const task: Task | null = await TaskModel.findById(req.params.id).lean()
      if (!task) {
        return res.status(404).send({ message: 'task not found' })
      }
      res.status(200).send(task)
    } catch (err) {
      next(err)
    }
  },

  async updateTask (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { title, description, status, importance } = req.body
      const task: Task | null = await TaskModel.findById(req.params.id).lean()
      if (!task) {
        return res.status(404).send({ message: 'task not found' })
      }
      const updatedTask: Task = await TaskModel.findOneAndUpdate(
        { _id: req.params.id },
        { title: title, description: description, status: status, importance: importance },
        { new: true })
      res.status(200).send(updatedTask)
    } catch (err) {
      next(err)
    }
  },

  async updateTaskPatch (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { title, description, status, importance } = req.body
      const task: Task | null = await TaskModel.findById(req.params.id).lean()
      if (!task) {
        return res.status(404).send({ message: 'task not found' })
      }
      const updatedTask: Task = await TaskModel.findOneAndUpdate(
        { _id: req.params.id },
        { title: title, description: description, status: status, importance: importance },
        { new: true }).lean()
      res.status(200).send(updatedTask)
    } catch (err) {
      next(err)
    }
  },

  async deleteTask (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const task: Task | null = await TaskModel.findById(req.params.id).lean()
      if (!task) {
        return res.status(404).send({ message: 'task not found' })
      }
      await TaskModel.findByIdAndDelete(req.params.id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
