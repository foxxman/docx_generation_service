import { AlignmentType, Paragraph, TextRun } from "docx"

export const documentTitle = ({text}: {text: string}): Paragraph => {
    return new Paragraph({
        children: [new TextRun({
            text,
            size: '14pt',
            font: 'Times New Roman',
            allCaps: true,
            bold: true,
        })],
        alignment: AlignmentType.CENTER,
    })
}