import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { OwnersService } from "./owners.service";
import { Owner } from "./owner.entity";
import { CreateOwnerInput, UpdateOwnerInput } from "./owner.dto";
import { Pet } from "../pets/pet.entity";

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  async createOwner(
    @Args("createOwnerInput") createOwnerInput: CreateOwnerInput
  ) {
    return await this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner])
  async owners() {
    return await this.ownersService.findAll();
  }

  @Query(() => Owner)
  async owner(@Args("id", { type: () => Int }) id: number) {
    return await this.ownersService.findOne(id);
  }

  @Mutation(() => Owner)
  async updateOwner(
    @Args("updateOwnerInput") updateOwnerInput: UpdateOwnerInput
  ) {
    return await this.ownersService.update(
      updateOwnerInput.id,
      updateOwnerInput
    );
  }

  @ResolveField(() => [Pet])
  async pets(@Parent() owner: Owner): Promise<Pet[]> {
    return await this.ownersService.getAllPets(owner.id);
  }

  @Mutation(() => Owner)
  removeOwner(@Args("id", { type: () => Int }) id: number) {
    return this.ownersService.remove(id);
  }
}
