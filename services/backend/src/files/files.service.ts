import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Properties } from './types/properties';
import { writeFileAsync } from '../utils/files';
import { vars } from "../config/vars";

@Injectable()
export class FilesService {
    async saveDocx(props: Properties.SaveDocx): Promise<string> {
        const { filename, buffer } = props;
        const directory = vars.docxSaveDir;
        const filePath = `${directory}/${filename}`;
                
        await this.checkDirectory({
            directory,
            create: true,
        });
        
        await writeFileAsync(filePath, buffer);
        
        return filePath;
    }

    async checkDirectory(props: Properties.CheckDirectory): Promise<boolean> {
        const { directory, create } = props;
        const isDirExists = fs.existsSync(directory) satisfies boolean;
        
        if (!isDirExists && create) {
            fs.mkdirSync(directory, { recursive: true });
            return true;
        }
        return isDirExists;        
    }
}
