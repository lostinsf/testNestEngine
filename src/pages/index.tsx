import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';

async function bootstrap() {
  // 준비
  const app = await NestFactory.create(AppModule);
  const swaggerOptions = new DocumentBuilder()
    .setTitle('test_nest_engine')
    .setDescription('신규 NEST 엔진 문서')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        description: 'Enter token',
        name: 'Authorization',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
      },
      'Authorization', //이 부분과
    )
    .build();
  const SwaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

  // 실행
  app.enableCors({
    origin: true,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // 스웨거 추가
  app.use(
    ['/docs'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.DOCS_ID]: process.env.DOCS_PASSWORD },
    }),
  );
  SwaggerModule.setup('docs', app, SwaggerDocument);
  await app.listen(process.env.PORT === '8080' ? 8080 : process.env.PORT);
}
bootstrap();
