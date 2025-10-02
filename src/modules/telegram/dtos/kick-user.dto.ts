import { IsString } from 'class-validator'

export class KickUserDto {
  @IsString()
  botId: string

  @IsString()
  chatId: string

  @IsString()
  userId: string
}
