import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class Create {
  @IsBoolean()
  @IsNotEmpty()
  active: boolean

  @IsString()
  @IsNotEmpty()
  accountId: string

  @IsString()
  @IsNotEmpty()
  customerId: string

  @IsString()
  @IsNotEmpty()
  planId: string

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date
}

export class Update {
  @IsBoolean()
  @IsOptional()
  active?: boolean

  @IsDate()
  @IsOptional()
  expiresAt?: Date
}
