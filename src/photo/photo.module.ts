import { PhotoController } from './photo.controller';
import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo, PhotoItem } from './photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, PhotoItem])],
  providers: [PhotoService],
  controllers: [PhotoController]
})
export class PhotoModule {}
