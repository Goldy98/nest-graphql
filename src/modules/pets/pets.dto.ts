import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsAlpha, IsEmail, IsNumber } from "class-validator";
import { Gender } from "src/helpers/types";
import { Pet, PetType } from "./pet.entity";

@InputType()
export class CreatePetInput {
  @IsAlpha()
  @Field(() => String)
  name: string;

  @Field(() => PetType)
  type: PetType;

  @Field(() => Gender)
  gender: Gender;

  @IsNumber()
  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => Int)
  ownerId: number;
}

@InputType()
export class UpdatePetInput extends PartialType(CreatePetInput) {
  @IsNumber()
  @Field(() => Int)
  id: number;
}
