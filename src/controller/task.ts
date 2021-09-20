import { Request, Response, NextFunction } from 'express'
import TaskModel, { Task } from '../model/task'

export default {
  async createTask (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, importance } = req.body
      const newTask: Task = await TaskModel.create({
        title,
        description,
        importance
      })
      res.status(201).json(newTask)
    } catch (err) {
      next(err)
    }
  },
  async getAllTasks (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tasks: Task[] = await TaskModel.find()
      res.status(200).json({
        results: tasks.length,
        tasks
      })
    } catch (err) {
      next(err)
    }
  },
  async getTaskById (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task: Task | null = await TaskModel.findById(req.params.id)
      res.status(200).json(task)
    } catch (err) {
      next(err)
    }
  },
  async updateTask (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title } = req.body
      const updatedTask: Task = await TaskModel.findOneAndUpdate(
        { _id: req.params.id },
        { title: title },
        { new: true })
      res.status(200).json(updatedTask)
    } catch (err) {
      next(err)
    }
  },
  async deleteTask (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await TaskModel.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'successfully deleted' })
    } catch (err) {
      next(err)
    }
  }
}
