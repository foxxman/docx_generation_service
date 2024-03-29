import * as fs from "fs";
import { Body, Controller, Get, Param, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { DocxService } from './docx.service';
import { Response } from "express";
import { vars } from "../config/vars";
import { PostCompareDocumentDto, PostGenerateDocumentDto } from "./dto";

@Controller('docx')
export class DocxController {
    constructor(private readonly docxService: DocxService) {}

    @Post('/generate')
    @UsePipes(new ValidationPipe({ transform: true }))
    async generateDocument(
        @Body() body: PostGenerateDocumentDto,
    ) {
        return await this.docxService.generateDocument(body);
    }

    @Post('/compare')
    @UsePipes(new ValidationPipe({ transform: true }))
    async compareDocuments(
        @Body() body: PostCompareDocumentDto,
    ) {
        return await this.docxService.compareDocument(body)
    }

    @Get(':filename')
    async downloadDocx(
        @Param('filename') filename: string,
        @Res() res: Response,
    ) {
        const filePath = `${vars.docxSaveDir}/${filename}`;
        const fileStream = fs.createReadStream(filePath);

        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': `attachment; filename="${filename}"`,
        });
       
        fileStream.pipe(res);
    }
}
