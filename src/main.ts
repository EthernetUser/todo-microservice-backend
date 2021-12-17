import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('BOOTSTRAP');
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 5000;

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () =>
      logger.log(`Server started on ${PORT} port...`),
    );
  } catch (e) {
    logger.error(e);
    process.exit();
  }
}
bootstrap();
