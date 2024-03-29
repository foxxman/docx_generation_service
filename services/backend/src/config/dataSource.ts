import { Note } from './../db/models/Note';
import { DataSource } from "typeorm"
import { vars } from "./vars"

const {
    host,
    port,
    username,
    password,
    database,
} = vars.dataBase

export const AppDataSource = new DataSource({
    type: "postgres",
    host,
    port,
    username,
    password,
    database,
    synchronize: true,
    logging: true,
    entities: [Note],
});