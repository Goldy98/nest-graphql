import {
  Field,
  Int,
  ObjectType,
  registerEnumType,
  DateScalarMode,
} from "@nestjs/graphql";
import { getGenderLabel } from "src/helpers";
import { Gender } from "src/helpers/types";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Owner } from "../owners/owner.entity";
import { UpdatePetInput } from "./pets.dto";

const typeAndInitialMap = {
  0: "Dogs",
  1: "Cats",
  2: "Snake",
};

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @Column("smallint")
  @Field(() => PetType)
  type: PetType;

  @Column("smallint")
  @Field(() => Gender)
  gender: Gender;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  age?: number;

  @Column()
  @Field(() => Int)
  ownerId: number;

  @ManyToOne(() => Owner, (owner) => owner.pets)
  @Field(() => Owner)
  owner: Owner;

  setInfos(dataSource: UpdatePetInput) {
    const { age, gender, name, type } = dataSource;

    this.name = name ?? this.name;
    this.gender = gender ?? this.gender;
    this.type = type ?? this.type;
    this.age = age ?? this.age;
  }
}

export enum PetType {
  Dogs,
  Cats,
  Snake,
}

registerEnumType(PetType, {
  name: "PetType",
  description: "The differents type of pets",
});

registerEnumType(Gender, {
  name: "Gender",
  description: "The differents gender of pets",
});
