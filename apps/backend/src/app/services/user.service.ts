import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MongoEntityRepository } from '@mikro-orm/mongodb';
import { User } from '../entities/user.entity';
import { ObjectId } from '@mikro-orm/mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: MongoEntityRepository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ _id: new ObjectId(id) });
  }

  async create(data: { name: string; email: string }): Promise<User> {
    const user = this.userRepo.create(data);
    await this.userRepo.getEntityManager().persistAndFlush(user);
    return user;
  }
}
