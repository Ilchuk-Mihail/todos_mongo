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
      const limit = parseInt(<string>req.query.limit)
      const skip = parseInt(<string>req.query.skip)
      const taskTotal: number = await TaskModel.countDocuments({})
      const tasks: Task[] = await TaskModel.find({}).skip(skip).limit(limit).lean()
      res.send({
        tasks,
        total: taskTotal,
        limit: limit,
        offset: skip
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
      res.send(task)
    } catch (err) {
      next(err)
    }
  },

  async replaceTask (req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { title, description, status, importance } = req.body
      const task: Task | null = await TaskModel.findById(req.params.id).lean()
      if (!task) {
        return res.status(404).send({ message: 'task not found' })
      }
      const updatedTask: Task = await TaskModel.findOneAndReplace(
        { _id: req.params.id },
        {
          _id: req.params.id,
          createdAt: new Date(),
          description: description,
          importance: importance,
          status: status,
          title: title,
          updatedAt: new Date()
        },
        { new: true }).lean()

      res.send(updatedTask)
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
        { new: true }).lean()
      res.send(updatedTask)
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
      await TaskModel.deleteOne({ _id: req.params.id })
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
