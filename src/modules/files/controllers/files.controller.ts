import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from '../services/files.service'
import { Public } from '@src/constants'
import { ImageUploadDto } from '../dtos/image-upload.dto'

@Controller('files')
export class FilesController {
  constructor(private readonly fileSService: FilesService) {}

  @Public()
  @Post('upload/buffer')
  @UseInterceptors(FileInterceptor('file'))
  uploadImageBuffer(@UploadedFile() file: Express.Multer.File) {
    return this.fileSService.uploadImageBuffer(file)
  }

  @Public()
  @Post('upload')
  uploadImage(@Body() body: ImageUploadDto) {
    return this.fileSService.uploadImage(body)
  }
}
