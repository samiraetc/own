import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../entities/user.entity';
import { MongoDriver } from '@mikro-orm/mongodb';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          driver: MongoDriver,
          dbName: 'own_db_test',
          clientUrl: 'mongodb://localhost:27017',
          entities: [User],
          forceEntityConstructor: true,
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const user = await service.create({
      name: 'Teste',
      email: 'teste@x.com',
    });

    expect(user).toBeDefined();
    expect(user.email).toBe('teste@x.com');
  });

  it('should return all users', async () => {
    const users = await service.findAll();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should find user by ID', async () => {
    const created = await service.create({
      name: 'Admin',
      email: 'admin@x.com',
    });

    const found = await service.findOneById(created._id.toHexString());
    expect(found).toBeDefined();
    expect(found?.email).toBe('admin@x.com');
  });
});
