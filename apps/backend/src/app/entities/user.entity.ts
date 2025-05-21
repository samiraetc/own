import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryKey()
  _id!: ObjectId;

  @Field()
  @Property()
  name!: string;

  @Field()
  @Property()
  email!: string;
}
