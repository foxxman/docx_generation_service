import { Paragraph } from "docx"

export const emptyString = (count?:number): Paragraph | Paragraph[] => 
    count ? new Array(count).fill(new Paragraph({})) : new Paragraph({});