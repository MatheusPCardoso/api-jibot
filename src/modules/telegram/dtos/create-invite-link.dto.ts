import { IsString } from 'class-validator'

export class CreateInviteLinkDto {
  @IsString()
  botId: string

  @IsString()
  chatId: string

  @IsString()
  userId: string
}
