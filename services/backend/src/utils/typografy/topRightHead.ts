import { Paragraph, TextRun } from "docx";

export const topRightHead = ({text}: {text: string}): Paragraph => {
    return new Paragraph({
        children: [new TextRun({
            text,
            size: '14pt',
            font: 'Times New Roman',
            italics: true,
        })],
        indent: {
            left: '11.25cm',
        },
    })
}