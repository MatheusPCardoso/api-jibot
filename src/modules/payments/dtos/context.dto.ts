import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

class BotDto {
  @IsString()
  id: string

  @IsString()
  name: string
}

class ChatDto {
  @IsOptional()
  @IsString()
  id?: string

  @IsString()
  name: string

  @IsString()
  number: string
}

class BotAndChatDto {
  @ValidateNested()
  @Type(() => BotDto)
  bot: BotDto

  @ValidateNested()
  @Type(() => ChatDto)
  chat: ChatDto

  @IsString()
  product: string

  @IsString()
  quantity: string
}

export class ContextDto {
  @ValidateNested()
  @Type(() => BotAndChatDto)
  context: BotAndChatDto
}
