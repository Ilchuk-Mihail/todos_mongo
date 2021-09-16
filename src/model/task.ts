import { model, Schema } from 'mongoose'

export interface Task {
  _id: string
  title: string
  description: string
  importance: string 
  status: string 
  completedAt: Date
  createdAt: Date
  updatedAt: Date
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  importance: { type: String, required: true, default: 'LOW' },
  status: { type: String, required: true, default: 'NOT_STARTED' },
  completedAt: { type: Date, default: new Date() },
}, {
  timestamps: true,
  collection: 'items'
})

export default model<Task>('Task', TaskSchema)
