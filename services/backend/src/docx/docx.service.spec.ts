import { Document } from 'docx';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './../files/files.service';
import { Note } from '../db/models/Note';
import { vars } from '../config/vars';
import { DocxService } from './docx.service';

const {
  host,
  port,
  username,
  password,
  database,
} = vars.dataBase;

describe('DocxService', () => {
  let service: DocxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
        TypeOrmModule.forFeature([Note])
      ],
      providers: [DocxService, FilesService],
    }).compile();

    service = module.get<DocxService>(DocxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a Document object', async () => {
    const content = {
      to: 'Иванову Ивану Ивановичу',
      from: 'Петрова Петра Петровича',
      title: 'Служебная записка',
      text: 'Хотелось бы обратить ваше внимание на ситуацию с продуктом на кухне офиса. Обнаружено, что некоторые упаковки молока превысили свой срок годности и не пригодны для употребления.\tСитуация с истекшим сроком годности продукта не только представляет потенциальную угрозу для здоровья сотрудников, но и нарушает стандарты гигиены в рабочем пространстве. Для обеспечения безопасности и комфортной атмосферы в офисе, рекомендуется провести проверку всех продуктов на кухне и удалить все продукты с истекшим сроком годности.\tПросим принять необходимые меры по устранению данной проблемы и поддержанию чистоты и порядка на кухне офиса. Мы также рекомендуем обсудить вопрос регулярного контроля сроков годности продуктов и обучения сотрудников правильной организации хранения продуктов.\tБлагодарим за внимание к данному вопросу.',
      addressee: 'Петров П. П.',
    };

    const result = service.createDocumentTemplate(content);
    expect(result).toBeInstanceOf(Document);
  });
});
