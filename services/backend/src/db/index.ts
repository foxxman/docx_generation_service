import { Note } from './models/Note';
import { AppDataSource } from './../config/dataSource';

export const notesRepository = AppDataSource.getRepository(Note);
