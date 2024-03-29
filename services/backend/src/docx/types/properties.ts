import { Note } from "../../db/models/Note";

export namespace Properties {
    export interface CreateDocumentTemplate {
        to: string;
        from: string;
        title: string;
        text: string;
        addressee: string;
    }

    export interface createDocumentDifferensesTemplate {
        incoming: CreateDocumentTemplate;
        existing: Note;
    }
}