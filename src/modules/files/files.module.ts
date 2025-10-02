import { Module } from '@nestjs/common'
import { FilesService } from './services/files.service'
import { FilesProvider } from './providers/files.provider'
import { FilesController } from './controllers/files.controller'

@Module({
  providers: [FilesProvider, FilesService],
  exports: [FilesProvider, FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
