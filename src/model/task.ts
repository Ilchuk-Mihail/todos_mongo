import { model, Schema } from 'mongoose'

export enum TaskImportance {
  LOW ='LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum TaskStatus {
  NOT_STARTED ='NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  _id?: string
  title: string
  description: string
  importance: TaskImportance
  status: TaskStatus
  completedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  importance: {
    type: String,
    enum: {
      values: Object.values(TaskImportance),
      message: '{VALUE} is not supported'
    },
    default: TaskImportance.LOW
  },
  status: {
    type: String,
    enum: {
      values: Object.values(TaskStatus),
      message: '{VALUE} is not supported'
    },
    default: TaskStatus.NOT_STARTED
  },
  completedAt: { type: Date, default: null }
}, {
  timestamps: true,
  collection: 'items'
})

export default model<Task>('Task', TaskSchema)
