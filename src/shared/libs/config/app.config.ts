import { registerAs } from '@nestjs/config';
import { JWT_ALGORITHM } from './app-config.const';
import * as Joi from 'joi';

type AvailableJWTAlgorithm = typeof JWT_ALGORITHM[keyof typeof JWT_ALGORITHM];

interface AppConfig  {
  port: number,
  jwtSecret: string,
  jwtAccessTokenExpiresIn: string,
  jwtAlgorithm: AvailableJWTAlgorithm,
}

const validationSchema = Joi.object({
  port: Joi.number().required().port(),
  jwtSecret: Joi.string().required(),
  jwtAccessTokenExpiresIn: Joi.string().required(),
  jwtAlgorithm: Joi.string().valid(...Object.values(JWT_ALGORITHM)),
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
  }

  validateConfig(config);
  return config;
}

export default registerAs('app', getConfig);