import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator'

class PaymentProviderInfo {
  @IsString()
  @IsNotEmpty()
  id: string
}

class Telegram {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsOptional()
  photo?: string
}

class ContactInfo {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Telegram)
  telegram: Telegram
}

export class Create {
  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsNotEmpty()
  @IsString()
  lastName: string

  @IsNotEmpty()
  @IsString()
  accountId: string

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactInfo)
  contactInfo: ContactInfo

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentProviderInfo)
  paymentProviderInfo?: PaymentProviderInfo
}

export class Update {
  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactInfo)
  contactInfo?: ContactInfo

  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentProviderInfo)
  paymentProviderInfo?: PaymentProviderInfo
}
