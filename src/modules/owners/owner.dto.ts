import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { IsAlpha, IsNumber } from "class-validator";
import { Gender } from "src/helpers/types";

@InputType()
export class CreateOwnerInput {
  @IsAlpha()
  @Field(() => String)
  name: string;

  @Field(() => Gender)
  gender: Gender;
}

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
  @IsNumber()
  @Field(() => Int)
  id: number;
}
