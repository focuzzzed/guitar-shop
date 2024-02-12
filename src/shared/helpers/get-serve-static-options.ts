import { ConfigService } from '@nestjs/config';
import { SERVE_ROOT } from '../modules/products/file/file.const';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static';

export function getServeStaticOptions(): ServeStaticModuleAsyncOptions {
  return {
    useFactory: (configService: ConfigService) => {
      const rootPath = configService.get<string>('app.uploadDirectory');
      return [{
        rootPath,
        serveRoot: SERVE_ROOT,
        serveStaticOptions: {
          etag: true,
          fallthrough: true
        }
      }]
    },
    inject: [ConfigService],
  }
}