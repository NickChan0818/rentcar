import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly defaultWhere = { isVoid: false };

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    createUserDto.password = hashedPassword;
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ where: { ...this.defaultWhere } });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email, ...this.defaultWhere } });
    if (!user) throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id, ...this.defaultWhere } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id, ...this.defaultWhere } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    await this.userRepository.update(id, updateUserDto);

    const updateUserResult = await this.userRepository.findOne({ where: { id } });
    if (!updateUserResult) throw new NotFoundException(`User with id ${id} not found`);

    return updateUserResult;
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id, ...this.defaultWhere } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    user.isVoid = true;
    await this.userRepository.save(user);
  }

  async comparePassword(email: string, password: string): Promise<{ userId: number | null; isCompare: boolean }> {
    const user = await this.findByEmail(email);
    if (!user) return { userId: null, isCompare: false };
    return { userId: user.id, isCompare: await bcrypt.compare(password, user.password) };
  }
}
