import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    @Generated("uuid")
    uuid: string;

    @Column({ length: 100, nullable: true })
    user?:string;

    @Column({ length: 100 })
    fullname:string;

    @Column({ length: 45 })
    picture:string;

    @Column({ length: 36, nullable: true })
    birthday?:string;

    @Column({ type: 'text', nullable: true })
    socials?:string;

    @Column({ default: true, nullable: true})
    isActive?:boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}