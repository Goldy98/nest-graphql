import { forwardRef, Module } from "@nestjs/common";
import { PetsService } from "./pets.service";
import { PetsResolver } from "./pets.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pet } from "./pet.entity";
import { OwnersModule } from "../owners/owners.module";

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), forwardRef(() => OwnersModule)],
  providers: [PetsService, PetsResolver],
  exports: [PetsService],
})
export class PetsModule {}
