import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
  async create(@Body() photo: Photo): Promise<any> {
    return await this.service.create(photo);
  }
}
