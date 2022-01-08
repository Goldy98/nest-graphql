import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { cwd } from "process";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OwnersModule } from "./modules/owners/owners.module";
import { PetsModule } from "./modules/pets/pets.module";
import { dbProvider } from "./providers/database.providers";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        "graphql-schemas/all-schemas.graphql"
      ),
    }),
    dbProvider,
    OwnersModule,
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
