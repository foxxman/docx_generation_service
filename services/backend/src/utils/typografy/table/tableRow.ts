import { TableRow } from "docx"
import { tableCell } from './tableCell';

export const tableRow = ({cells}: {cells: string[]}): TableRow => {
    return new TableRow({
        children: cells.map(cell => tableCell({text: cell}))
    })
}