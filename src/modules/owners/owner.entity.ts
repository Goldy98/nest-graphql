import { ObjectType, Field, Int } from "@nestjs/graphql";
import { type } from "os";
import { Gender } from "src/helpers/types";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "../pets/pet.entity";
import { UpdateOwnerInput } from "./owner.dto";

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column("varchar", { unique: true })
  @Field(() => String)
  name: string;

  @Column("smallint")
  @Field(() => Gender)
  gender: Gender;

  @OneToMany(() => Pet, (pet) => pet.ownerId)
  @Field(() => [Pet], { nullable: true })
  pets?: Pet[];

  setInfos(dataSource: UpdateOwnerInput) {
    const { gender, name } = dataSource;

    this.name = name ?? this.name;
    this.gender = gender ?? this.gender;
  }
}
