import 'multer';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import appConfig from '../../../libs/config/app.config';
import { ConfigType } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { join } from 'node:path';
import {ensureDir, writeFile } from 'fs-extra';
import { randomUUID } from 'node:crypto';
import { AVAILABLE_FILE_EXTENSIONS, SERVE_ROOT } from './file.const';
import { getFileExtension } from '../../../helpers';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(appConfig.KEY)
    private readonly appOptions: ConfigType<typeof appConfig>
  ) { }

  private getUploadDirectoryPath(): string {
    return this.appOptions.uploadDirectory;
  }

  private getSubUploadDirectoryPath() {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join(year, month)
      .replace(/\\/g, '/');
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename)
      .replace(/\\/g, '/');
  }

  public async writeFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = getFileExtension(file.originalname);

    if(!AVAILABLE_FILE_EXTENSIONS.includes(fileExtension)) {
      throw new BadRequestException(`Available file extensions: ${Object.values(AVAILABLE_FILE_EXTENSIONS)}`);
    }

    try {
      const uploadDirectory = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();

      const filename = `${ randomUUID() }.${ fileExtension }`;
      const path = this.getDestinationFilePath(filename);

      await ensureDir(join(uploadDirectory, subDirectory));
      await writeFile(path, file.buffer);

      return join(SERVE_ROOT, subDirectory, filename);
    } catch(err) {
      this.logger.error(`Error while saving file: ${err.message}`);
      throw new Error(`Can't save file ${file.originalname}`);
    }
  }
}