import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('place_types')
export class PlaceTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  icon: string;
}
