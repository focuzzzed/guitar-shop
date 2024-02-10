import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getJWTOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('app.jwtSecret'),
    signOptions: {
      expiresIn: configService.get<string>('app.jwtAccessTokenExpiresIn'),
      algorithm: configService.get('app.jwtAlgorithm'),
    }
  }
}