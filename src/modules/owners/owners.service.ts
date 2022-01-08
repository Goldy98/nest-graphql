import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { checkUnicity, logger } from "src/helpers";
import { Repository } from "typeorm";
import { Pet } from "../pets/pet.entity";
import { PetsService } from "../pets/pets.service";
import { CreateOwnerInput, UpdateOwnerInput } from "./owner.dto";
import { Owner } from "./owner.entity";

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepo: Repository<Owner>,
    @Inject(forwardRef(() => PetsService))
    private readonly petsService: PetsService
  ) {}

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const { name } = createOwnerInput;

    const isUnique = await checkUnicity({ name }, this.ownerRepo);

    if (!isUnique)
      throw new Error(
        "A pet owner with the same name already exist, please choose another one"
      );

    const newOwner = this.ownerRepo.create(createOwnerInput);

    const savedOwner = await this.ownerRepo.save(newOwner);

    logger.log("New owner created with ID:" + savedOwner.id);

    return savedOwner;
  }

  async findAll() {
    return await this.ownerRepo.find();
  }

  async findOne(id: number): Promise<Owner | undefined> {
    return await this.ownerRepo.findOneOrFail(id);
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    const ownerToUpdate = await this.findOne(id);

    ownerToUpdate.setInfos(updateOwnerInput);

    return await this.ownerRepo.save(ownerToUpdate);
  }

  async remove(id: number): Promise<number> {
    const deletionResult = await this.ownerRepo.delete({
      id,
    });

    if (deletionResult !== undefined && deletionResult.affected !== 0) {
      return id;
    } else {
      throw new Error(
        "Une erreur est survenue lors de la tentative de suppresion du owner avec l'ID" +
          id
      );
    }
  }

  async getAllPets(id: number): Promise<Pet[]> {
    return this.petsService.getOwnerPets(id);
  }
}
