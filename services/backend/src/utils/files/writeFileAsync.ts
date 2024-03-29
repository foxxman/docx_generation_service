import * as fs from 'fs';
import { promisify } from 'util';

export const writeFileAsync = promisify(fs.writeFile);