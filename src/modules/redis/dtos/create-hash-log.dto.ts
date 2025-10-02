import { IsNumber, IsString } from 'class-validator'

export class CreateHashLogDto {
  @IsNumber()
  accountId: number

  @IsString()
  complement: string

  @IsString()
  key: string

  @IsString()
  value: string
}
