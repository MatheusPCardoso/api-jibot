import { IsNumber, IsString } from 'class-validator'

export class GetHashLogDto {
  @IsNumber()
  accountId: number

  @IsString()
  complement: string

  @IsString()
  key: string
}
