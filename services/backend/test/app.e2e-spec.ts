import * as fs from 'fs';
import * as request from 'supertest';
import { FilesService } from '../src/files/files.service';
import { DocxController } from '../src/docx/docx.controller';
import { DocxService } from '../src/docx/docx.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DocxModule } from '../src/docx/docx.module';
import { vars } from '../src/config/vars';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DocxModule],
      controllers: [DocxController],
      providers: [DocxService, FilesService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/docx/generate (POST)', async () => {
      const requestBody = {
        documentName: "cssvcscs",
        content: {
            to: "cssvcscs",
            from: "cssvcscs",
            title: "cssvcscs",
            text: "sxaxaxas",
            addressee: "cssvcscs"
        }
      }
      const response = await request(app.getHttpServer())
        .post('/docx/generate')
        .send(requestBody)
        .expect(201)

      const responseBody = JSON.parse(response.text);

      expect(responseBody).toHaveProperty('url');
      expect(typeof responseBody.url).toBe('string');
  });

  it('/docx/generate (POST without content)', async () => {
    const requestBody = {
      documentName: "cssvcscs",
    }
    await request(app.getHttpServer())
      .post('/docx/generate')
      .send(requestBody)
      .expect(400)
  });

  it('/docx/generate (POST without document name)', async () => {
    const requestBody = {
      content: {
        to: "cssvcscs",
        from: "cssvcscs",
        title: "cssvcscs",
        text: "sxaxaxas",
        addressee: "cssvcscs"
      }
    }
    
    await request(app.getHttpServer())
      .post('/docx/generate')
      .send(requestBody)
      .expect(400)
  });

  it('/docx/generate (POST without internal content property)', async () => {
    const requestBody = {
      documentName: "cssvcscs",
      content: {
        to: "cssvcscs",
        from: "cssvcscs",
        title: "cssvcscs",
        addressee: "cssvcscs"
      }
    }
    
    await request(app.getHttpServer())
      .post('/docx/generate')
      .send(requestBody)
      .expect(400)
  });

  it('/docx/:filename (GET)', async () => {
    const testFilename = 'testfile.txt'
    const filePath = `${vars.docxSaveDir}/${testFilename}`;
    fs.writeFileSync(filePath, 'Test content');

    const response = await request(app.getHttpServer())
      .get(`/docx/${testFilename}`)
      .expect(200);

    expect(response.header['content-type']).toEqual('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    expect(response.header['content-disposition']).toEqual(`attachment; filename="${testFilename}"`);
    expect(response.text).toEqual('Test content');
    
    fs.unlinkSync(filePath);
  });
});
