import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { cwd } from "process";

export const dbProvider = TypeOrmModule.forRoot({
  type: "better-sqlite3",
  database: join(cwd(), "database.sqlite"),
  entities: ["dist/**/*.entity.js"],
  // synchronize: true,
  // migrationsRun: true,
});
