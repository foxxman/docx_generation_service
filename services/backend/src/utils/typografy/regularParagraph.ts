import { AlignmentType, Paragraph, TextRun } from "docx";

export const regularParagraph = ({text}: {text: string}): Paragraph => {
    return new Paragraph({
        children: [new TextRun({
            text,
            size: '14pt',
            font: 'Times New Roman',
        })],
        indent: {
            firstLine: '1.25cm',
        },
        spacing: {
            line: 360,
        },
        alignment: AlignmentType.JUSTIFIED,
    })
};
