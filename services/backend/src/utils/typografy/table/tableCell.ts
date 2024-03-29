import { Paragraph, TableCell } from "docx"

export const tableCell = ({text}: {text: string}): TableCell => {
    return new TableCell({
        children: text.split('\n').map(text => new Paragraph({ text }))
    })
}
