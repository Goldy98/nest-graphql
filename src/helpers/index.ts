import { Logger } from "@nestjs/common";
import { Owner } from "src/modules/owners/owner.entity";
import { OwnersService } from "src/modules/owners/owners.service";
import { Pet } from "src/modules/pets/pet.entity";
import { PetsService } from "src/modules/pets/pets.service";
import {
  FindCondition,
  FindConditions,
  FindOneOptions,
  Repository,
} from "typeorm";
import { Gender } from "./types";

export const logger = new Logger();

const genderAndInitialMap = {
  0: "Male",
  1: "Female",
  2: "Other",
};

export function getGenderLabel(gender: Gender) {
  return genderAndInitialMap[gender];
}

export async function checkUnicity(
  searchOptions: FindConditions<Owner | Pet>,
  repoToUse: Repository<Owner | Pet>
) {
  const foundOccurence = await repoToUse.findOne({
    where: searchOptions,
  });

  console.log("foundOccurence:", foundOccurence);

  return foundOccurence === undefined;
}
