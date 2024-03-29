import { Properties } from "../../docx/types/properties";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('note')
export class Note {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id!: number;

  @Column('varchar', { name: 'to', length: 255 })
  to!: string;

  @Column('varchar', { name: 'from', length: 255 })
  from!: string;

  @Column('varchar', { name: 'title', length: 255 })
  title!: string;

  @Column('varchar', { name: 'text', length: 1024 })
  text!: string;

  @Column('varchar', { name: 'addressee', length: 255 })
  addressee!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}