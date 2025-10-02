import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class Create {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  accountIds: string[]

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class Update {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  accountIds?: string[]

  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsString()
  @IsOptional()
  password?: string
}
