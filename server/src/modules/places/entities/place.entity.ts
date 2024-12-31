import {
  Column,
  Entity,
  Geometry,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { PlaceTypeEntity } from '../../PlaceTypes/entities/placeType.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  location: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => PlaceTypeEntity, { eager: true })
  placeType: PlaceTypeEntity;

  @ManyToOne(() => Category, { eager: true })
  category: Category;

  @Column()
  @IsEnum(['budget_friendly', 'moderate', 'expensive', 'very_expensive'])
  cost: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  createdBy: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  updatedBy: string;
}
