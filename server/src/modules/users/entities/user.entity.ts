import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../dto/userRoles';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER, // Default role
  })
  role: UserRole;

  @Column({ nullable: true })
  profileImg: string;
}
