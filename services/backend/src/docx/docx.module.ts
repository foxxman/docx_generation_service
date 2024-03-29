import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Note } from './../db/models/Note';

import { DocxService } from './docx.service';
import { FilesService } from './../files/files.service';

import { DocxController } from './docx.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [DocxController],
  providers: [DocxService, FilesService]
})
export class DocxModule {}
