import { IsString } from 'class-validator'

export class CreatePlanPaymentDto {
  @IsString()
  product: string

  @IsString()
  quantity: string

  @IsString()
  userNumber: string
}
