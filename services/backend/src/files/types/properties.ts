export namespace Properties {
    export interface SaveDocx {
        buffer: Buffer;
        filename: string;
    }

    export interface CheckDirectory {
        directory: string;
        create: boolean;
    }
}