import 'dotenv/config'
import { parseNumber, parseString } from "../utils/parsers";

const backendPort = parseNumber(process.env.BACKEND_PORT, 3000);

export const vars = {
    backendPort,
    serverAdress: `http://localhost:${backendPort}`,
    docxSaveDir: 'static/docx',
    dataBase: {
        host: parseString(process.env.POSTGRES_HOST, 'localhost'),
        port: parseNumber(process.env.POSTGRES_PORT, 5432),
        username: parseString(process.env.POSTGRES_USER, 'postgres'),
        password: parseString(process.env.POSTGRES_PASSWORD, '123456Aa!'),
        database: parseString(process.env.POSTGRES_DB, 'dgs'),
    }
};
