import { IsString, IsEnum, IsOptional, IsMongoId } from 'class-validator'
import { TaskImportance, TaskStatus } from '../model/task'

export class CreateTaskDto {
  @IsString()
  title!: string

  @IsString()
  description!: string

  @IsEnum(TaskImportance)
  @IsOptional()
  importance!: string

  @IsEnum(TaskStatus)
  @IsOptional()
  status!: string
}

export class UpdateTaskDto extends CreateTaskDto {
  @IsOptional()
  title!: string

  @IsOptional()
  description!: string
}

export class ReplaceTaskDto extends CreateTaskDto {}

export class IdParam {
  @IsMongoId({ message: 'invalid Id' })
  id!: string
}

export class DeleteTaskDto extends IdParam {}
