import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { vars } from '../config/vars';

export const runNest = async () => {
    const app = await NestFactory.create(AppModule);
    await app.listen(vars.backendPort).then(()=> console.log(`Running on port ${vars.backendPort}`));
}
