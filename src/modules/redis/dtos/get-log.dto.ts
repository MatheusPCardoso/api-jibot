import { IsString } from 'class-validator'

export class GetLogDto {
  @IsString()
  key: string
}
