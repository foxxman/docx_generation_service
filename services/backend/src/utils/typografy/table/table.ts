import { Table } from "docx"
import { tableRow } from "./tableRow"

export const table = ({rows}: {rows: string[][]}): Table => {
    return new Table({
        rows: rows.map((row) => tableRow({cells: row})),
    })
}