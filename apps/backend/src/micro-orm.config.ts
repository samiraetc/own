import { defineConfig, MongoDriver } from '@mikro-orm/mongodb';
import { Options } from '@mikro-orm/core';
import { User } from './app/entities/user.entity';

export default defineConfig({
  driver: MongoDriver,
  clientUrl: 'mongodb://localhost:27017/own_db',
  dbName: 'own_db',
  entities: [User],
  forceEntityConstructor: true,
  allowGlobalContext: true,
} satisfies Options<MongoDriver>);
