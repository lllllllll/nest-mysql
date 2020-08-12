import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  @Generated("uuid")
  uuid?: string;

  @Column({ length: 70 })
  name: string;

  @Column({type: 'text', nullable: true,})
  description?: string;

  @Column({ type: 'int', nullable: true, default: 1 })
  views?: number;

  @Column({nullable: true, default: true})
  isPublished?: boolean;
}

@Entity()
export class PhotoItem {
  @PrimaryGeneratedColumn('uuid')
  code: number;

  @Column({ length: 45 })
  photoUuid: string;

  @Column({ length: 45 })
  filename: string;
}

