import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private repo: Repository<Photo>,
  ) {}

  async create(photo: Photo) {
    return this.repo.save(photo);
  }

  async findAll(): Promise<Photo[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Photo> {
    return this.repo.findOne(id);
  }

  async remove(id: string): Promise<string> {
    return id;
  }
}
