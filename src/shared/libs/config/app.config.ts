import { registerAs } from '@nestjs/config';
import { JWT_ALGORITHM } from './app-config.const';
import * as Joi from 'joi';

type AvailableJWTAlgorithm = typeof JWT_ALGORITHM[keyof typeof JWT_ALGORITHM];

interface AppConfig  {
  port: number,
  jwtSecret: string,
  jwtAccessTokenExpiresIn: string,
  jwtAlgorithm: AvailableJWTAlgorithm,
  uploadDirectory: string,
  mail: {
    host: string,
    port: number,
    user: string,
    password: string,
    from: string
  }
}

const validationSchema = Joi.object({
  port: Joi.number().required().port(),
  jwtSecret: Joi.string().required(),
  jwtAccessTokenExpiresIn: Joi.string().required(),
  jwtAlgorithm: Joi.string().valid(...Object.values(JWT_ALGORITHM)).required(),
  uploadDirectory: Joi.string().required(),
  mail: Joi.object({
    host: Joi.string(),
    port: Joi.number().required().port(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    from: Joi.string().required(),
  })
})

function validateConfig(config: AppConfig) {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if(error){
    throw new Error(`[Application config validation error]: ${error}`)
  }
}

function getConfig(): AppConfig {
  const config: AppConfig =  {
    port: parseInt(process.env.PORT, 10),
    jwtSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    jwtAlgorithm: process.env.JWT_ALGORITHM as AvailableJWTAlgorithm,
    uploadDirectory: process.env.UPLOAD_DIRECTORY,
    mail: {
      host: process.env.MAIL_SMTP_HOST,
      port: parseInt(process.env.MAIL_SMTP_PORT, 10),
      user: process.env.MAIL_USER_NAME,
      password: process.env.MAIL_USER_PASSWORD,
      from: process.env.MAIL_FROM,
    }
  }

  validateConfig(config);
  return config;
}

export default registerAs('app', getConfig);