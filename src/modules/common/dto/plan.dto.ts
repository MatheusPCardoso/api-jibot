import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class Create {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsNotEmpty()
  @IsString()
  accountId: string

  @IsNotEmpty()
  @IsNumber()
  duration: number
}

export class Update {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsNumber()
  amount?: number

  @IsOptional()
  @IsNumber()
  duration?: number
}
