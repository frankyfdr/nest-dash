import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  icon: string;
}
