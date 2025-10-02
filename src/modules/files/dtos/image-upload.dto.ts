import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class ImageUploadDto {
  @ApiProperty({ description: 'src do arquivo', required: true })
  @IsNotEmpty()
  src: string

  @ApiProperty({ description: 'folder para salvar' })
  @IsOptional()
  folder: string
}
