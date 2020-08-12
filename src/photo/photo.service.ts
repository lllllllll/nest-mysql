import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo, PhotoItem } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private repo: Repository<Photo>,
    @InjectRepository(PhotoItem)
    private repoItem: Repository<PhotoItem>,
    private connection: Connection,
  ) {}

  async create(photo: Photo, files: PhotoItem[]) {
    const resPhoto = await this.repo.save(photo);
    
    if (resPhoto) {
      await this.connection.transaction(async () => {
        for (let i = 0; i < files.length; i++) {
          files[i].photoUuid = resPhoto.uuid;
          await this.repoItem.save(files[i]);
        }
      });

      return resPhoto;
    }

    throw new Error();
  }

  async findAll(): Promise<Photo[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Photo> {
    return this.repo.findOne(id);
  }

  async remove(id: string): Promise<string> {
    this.repo.delete(id);
    return id;
  }
}
