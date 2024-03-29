import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document, Packer, Paragraph } from 'docx';

import { Note } from './../db/models/Note';
import { FilesService } from './../files/files.service';
import { vars } from "../config/vars";
import { RequestsBody } from 'types/reqests';
import { Responses } from 'types/responses';
import { Properties } from './types/properties';
import { generateFileName } from '../utils/files';
import {
    table,
    emptyString,
    topRightHead,
    documentTitle,
    regularParagraph,
} from '../utils/typografy';
import { DocumentFieldsNames } from '../const/docx';
import { compareParagraph } from './../utils/docx/compareParagraph';
import { createListFromParagraph } from '../utils/docx/createListFromParagraph';

@Injectable()
export class DocxService {
    constructor(
        @InjectRepository(Note)
        private readonly notesRepository: Repository<Note>,
        private readonly fileService: FilesService
    ) {}

    async generateDocument(props: RequestsBody.PostGenerateDocument): Promise<Responses.PostGenerateDocument> {
        const {
            documentName,
            content,
        } = props;
        
        const document = this.createDocumentTemplate(content);
        const docxBuffer = await Packer.toBuffer(document);
        
        const filename = generateFileName({
            name: documentName,
            extension: 'docx',
        });

        const existingNote = await this.notesRepository.find({
            order: {
                createdAt: 'desc',
            },
        });

        if (existingNote[0]) {
            existingNote[0].to = content.to;
            existingNote[0].from = content.from;
            existingNote[0].title = content.title;
            existingNote[0].text = content.text;
            existingNote[0].addressee = content.addressee;
            await this.notesRepository.save(existingNote[0]);
        } else {
            const note = new Note();
            note.to = content.to;
            note.from = content.from;
            note.title = content.title;
            note.text = content.text;
            note.addressee = content.addressee;
            await this.notesRepository.save(note);
        }

        await this.fileService.saveDocx({buffer: docxBuffer, filename});

        return { 
            url: `${vars.serverAdress}/docx/${filename}`
        };
    }

    async compareDocument(props: RequestsBody.PostCompareDocument): Promise<any> {
        const lastNote = await this.notesRepository.findOneBy({
            id: 1,
        });
        
        const document = this.createDocumentDifferensesTemplate({
            incoming: props, 
            existing: lastNote,
        });
        const docxBuffer = await Packer.toBuffer(document);
        const filename = generateFileName({
            name: 'differents',
            extension: 'docx',
        });
        await this.fileService.saveDocx({buffer: docxBuffer, filename});

        return { 
            url: `${vars.serverAdress}/docx/${filename}`
        };
    }

    createDocumentTemplate(props: Properties.CreateDocumentTemplate): Document {
        const {
            to,
            from,
            title,
            text,
            addressee,
        } = props;
        
        return new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        topRightHead({text: to}),
                        topRightHead({text: `от ${from}`}),
                        ...(emptyString(2) as Paragraph[]),
                        documentTitle({text: title}),
                        emptyString() as Paragraph,
                        ...createListFromParagraph({text}).map(item => regularParagraph({text: item})),
                        emptyString() as Paragraph,
                        regularParagraph({text: addressee})
                    ],
                },
            ],
        });
    }

    createDocumentDifferensesTemplate(props: Properties.createDocumentDifferensesTemplate): Document {
        const differents = Object.keys(props.incoming)
            .map(key => {
                const compareResult = compareParagraph({
                    incoming: props.incoming[key],
                    existing: props.existing[key],
                })
                return compareResult 
                ? [
                    DocumentFieldsNames[key],
                    compareResult.existing,
                    compareResult.incoming,
                ] 
                : null})
            .filter(k => !!k)
        
            return new Document({
                sections: [
                    {
                        properties: {},
                        children: [
                            topRightHead({text: 'lorem lorem lorem'}),
                            topRightHead({text: `от lorem lorem lorem`}),
                            ...(emptyString(2) as Paragraph[]),
                            documentTitle({text: "Разница документов"}),
                            emptyString() as Paragraph,
                            table({
                                rows: [
                                    ['Поле', 'Исходная версия', 'Изменения'],
                                    ...differents
                                ]
                            }),
                            emptyString() as Paragraph,
                            regularParagraph({text: 'Lorem L.L.'})
                        ],
                    },
                ],
            });
    }
}
