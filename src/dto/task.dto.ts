import {IsString, IsEnum, IsOptional, IsMongoId, IsNumberString, MinLength, MaxLength} from 'class-validator'
import { TaskImportance, TaskStatus } from '../model/task'

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  title!: string

  @IsString()
  @MinLength(1)
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

export class GetAllTaskDto {
  @IsOptional()
  @IsNumberString()
  @MinLength(0)
  @MaxLength(100)
  limit?: string

  @IsOptional()
  @IsNumberString()
  @MinLength(0)
  skip?: string

  @IsEnum(TaskImportance)
  @IsOptional()
  importance?: string

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: string
}

export class DeleteTaskDto extends IdParam {}
