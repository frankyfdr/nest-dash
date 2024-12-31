import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRole } from './dto/userRoles';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const saltRounds = 10; // Number of hashing rounds
    const { email, password, role, name, profileImg } = createUser;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole[role],
      profileImg,
    });

    return this.usersRepository.save(user);
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }
}
