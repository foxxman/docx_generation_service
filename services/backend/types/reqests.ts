import { Properties as DocxProps } from "../src/docx/types/properties";

export namespace RequestsBody {
    export interface PostGenerateDocument {
        documentName?: string;
        content: DocxProps.CreateDocumentTemplate;
    }

    export interface PostCompareDocument extends DocxProps.CreateDocumentTemplate {}
}
