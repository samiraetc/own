import { defineConfig, MongoDriver } from '@mikro-orm/mongodb';
import { Options } from '@mikro-orm/core';
import { User } from './app/entities/user.entity';

export default defineConfig({
  driver: MongoDriver,
  clientUrl: process.env.MONGODB_URI || 'mongodb://mongodb:27017/meubanco',
  dbName: 'own_db',
  entities: [User],
  forceEntityConstructor: true,
  allowGlobalContext: true,
} satisfies Options<MongoDriver>);
