import { IsString } from 'class-validator'

export class CreateLogDto {
  @IsString()
  key: string

  @IsString()
  value: string
}
