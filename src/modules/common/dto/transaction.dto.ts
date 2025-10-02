import { StatusValue } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

class PaymentProviderInfo {
  @IsNotEmpty()
  @IsString()
  id: string
}

export class Create {
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PaymentProviderInfo)
  paymentProviderInfo: PaymentProviderInfo

  @IsNotEmpty()
  @IsString()
  accountId: string

  @IsNotEmpty()
  @IsString()
  customerId: string
}

export class Update {
  @IsNumber()
  @IsNotEmpty()
  amount?: number

  @IsNotEmpty()
  status?: StatusValue

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentProviderInfo)
  paymentProviderInfo?: PaymentProviderInfo
}
