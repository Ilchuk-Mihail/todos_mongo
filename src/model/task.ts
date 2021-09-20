import { model, Schema } from 'mongoose'

export enum TaskImportance {
  Low ='LOW', Medium = 'MEDIUM', High = 'HIGH'
}

export enum TaskStatus {
  notStarted ='NOT_STARTED', inProgress = 'IN_PROGRESS', Completed = 'COMPLETED'
}

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
  importance: {
    type: String,
    enum: {
      values: [TaskImportance.Low, TaskImportance.Medium, TaskImportance.High],
      message: '{VALUE} is not supported'
    },
    required: true,
    default: TaskImportance.Low
  },
  status: {
    type: String,
    enum: {
      values: [TaskStatus.notStarted, TaskStatus.inProgress, TaskStatus.Completed],
      message: '{VALUE} is not supported'
    },
    required: true,
    default: TaskStatus.notStarted
  },
  completedAt: { type: Date, default: '' }
}, {
  timestamps: true,
  collection: 'items'
})

export default model<Task>('Task', TaskSchema)
