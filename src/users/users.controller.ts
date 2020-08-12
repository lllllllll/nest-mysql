import { Controller, Get, Post, Param, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { v4 } from 'uuid';
import { extname } from  'path';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private service: UsersService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    return await this.service.findOne(params.id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 1, {
    storage: diskStorage({
      destination: './upload/user',
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
  async create(@Body() user: User, @UploadedFiles() files: any): Promise<any> {
    console.log('>>> ', files);
    user.picture = files[0].filename;
    return await this.service.create(user);
  }
}
