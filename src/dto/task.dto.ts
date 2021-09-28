import { IsString, IsEnum, IsOptional, IsMongoId } from 'class-validator'
import { TaskImportance, TaskStatus } from '../model/task'
import { Expose } from 'class-transformer'

export class CreateTaskDto {
  @Expose()
  @IsString({ message: 'SHOULD BE STRING' })
  title!: string

  @Expose()
  @IsString()
  description!: string

  @Expose()
  @IsEnum(TaskImportance)
  @IsOptional()
  importance!: string

  @Expose()
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
  @Expose()
  @IsMongoId({ message: 'invalid Id' })
  id!: string
}

export class GetDeleteTaskDto extends IdParam {}
