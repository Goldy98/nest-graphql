import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { CreatePetInput, UpdatePetInput } from "./pets.dto";
import { Pet } from "./pet.entity";
import { PetsService } from "./pets.service";
import { Owner } from "../owners/owner.entity";

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(() => [Pet])
  async pets(): Promise<Pet[]> {
    return await this.petsService.findAll();
  }

  @Query(() => Pet)
  async pet(@Args("id", { type: () => Int }) id: number): Promise<Pet> {
    return await this.petsService.findOne(id);
  }

  @ResolveField(() => Owner)
  async owner(@Parent() pet: Pet): Promise<Owner> {
    return await this.petsService.getOwner(pet.ownerId);
  }

  @Mutation(() => Pet)
  async createPet(
    @Args("createPetInput", { type: () => CreatePetInput })
    createPetInput: CreatePetInput
  ): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }

  @Mutation(() => Pet)
  async updatePet(
    @Args("updatePetInput", { type: () => UpdatePetInput })
    updatePetInput: UpdatePetInput
  ): Promise<Pet> {
    return this.petsService.update(updatePetInput);
  }
}
