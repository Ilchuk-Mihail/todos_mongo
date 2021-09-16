import { Request, Response, NextFunction } from 'express'
import TaskModel, { Task } from '../model/task'

export default {
  async createItem (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description } = req.body
      const newTask: Task = await TaskModel.create({
        title,
        description
      })
      res.status(201).json(newTask)
    } catch (err) {
      next(err)
    }
  }
}
