import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class Create {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  photo: string
}

export class Update {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  photo?: string
}
