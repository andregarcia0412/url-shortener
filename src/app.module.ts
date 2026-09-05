import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import Joi from 'joi';
import { LinkModule } from './modules/link/link.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,

      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        ALLOWED_ORIGINS: Joi.string().when('NODE_ENV', {
          is: 'production',
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),

        MONGO_USER: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_PORT: Joi.number().port().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_URI: Joi.string().uri().required(),

        BASE_URL: Joi.string().uri().required(),
      }),
    }),
    DatabaseModule,
    LinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
