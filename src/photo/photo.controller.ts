import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';

@Controller('photo')
export class PhotoController {
  constructor(
    private service: PhotoService,
  ) {}

  @Get()
  async findAll(): Promise<Photo[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Photo> {
    return await this.service.findOne(params.id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 20, {
    storage: diskStorage({
      destination: './upload/photos',
      filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        switch (ext.toLowerCase()) {
          case '.jpg':
            return cb(null, `${v4()}.jpg`);
          case '.jpeg':
            return cb(null, `${v4()}.jpeg`);
          case '.gif':
            return cb(null, `${v4()}.gif`);
          case '.png':
            return cb(null, `${v4()}.png`);
          default:
            return cb(new Error('Only images are allowed'))
        }
      }
    })
  }))
  async create(@Body() photo: Photo, @UploadedFiles() files: any): Promise<any> {
    return await this.service.create(photo, files);
  }
}
