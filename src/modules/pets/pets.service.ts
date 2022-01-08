import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isAlpha } from "class-validator";
import { Repository } from "typeorm";
import { CreatePetInput, UpdatePetInput } from "./pets.dto";
import { Pet } from "./pet.entity";
import { Owner } from "../owners/owner.entity";
import { OwnersService } from "../owners/owners.service";
import { checkUnicity, logger } from "src/helpers";

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepo: Repository<Pet>,
    @Inject(forwardRef(() => OwnersService))
    private readonly ownersService: OwnersService
  ) {}

  async findAll(): Promise<Pet[]> {
    return this.petsRepo.find();
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepo.findOneOrFail(id);
  }

  async create(createPetInput: CreatePetInput): Promise<Pet> {
    const { ownerId, name, type } = createPetInput;

    console.log("---------createPetInput:", createPetInput);

    if (!(await this.checkOwnerExitence(ownerId)))
      throw new Error(
        `Unknow pet owner with ID:${ownerId} provided. Creation aborted`
      );

    const isUniqueName = await checkUnicity(
      {
        name,
        ownerId,
        type,
      },
      this.petsRepo
    );

    if (!isUniqueName)
      throw new Error(
        "Unable to add the pet cause an owner can not have many pets with the same name" +
          name
      );

    const newPet = this.petsRepo.create(createPetInput);

    const savedPet = await this.petsRepo.save(newPet);

    logger.log(
      "New pet created with ID:" + savedPet.id + " for Owner with ID:" + ownerId
    );

    return savedPet;
  }

  async update(updatePetInput: UpdatePetInput): Promise<Pet | undefined> {
    const petToUpdate = await this.petsRepo.findOne(updatePetInput.id);

    if (!petToUpdate) throw new Error("Unknow pet ! Update aborted");

    petToUpdate.setInfos(updatePetInput);

    return await this.petsRepo.save(petToUpdate);
  }

  private async checkOwnerExitence(ownerId: number): Promise<boolean> {
    return (await this.ownersService.findOne(ownerId)) !== undefined;
  }

  async getOwner(ownerId: number): Promise<Owner> {
    return await this.ownersService.findOne(ownerId);
  }

  async getOwnerPets(ownerId: number): Promise<Pet[]> {
    return await this.petsRepo.find({
      where: {
        ownerId,
      },
    });
  }
}
