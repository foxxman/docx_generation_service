import { Module } from '@nestjs/common';
import { DocxModule } from './docx/docx.module';
import { FilesService } from './files/files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './db/models/Note';
import { vars } from './config/vars';

const {
  host,
  port,
  username,
  password,
  database,
} = vars.dataBase

@Module({
  imports: [
    
    // ConfigModule.forRoot({
    // envFilePath: '.development.env',
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      synchronize: true,
      logging: true,
      entities: [Note],
    }),
    DocxModule,
  ],
  providers: [],
})
export class AppModule {}
