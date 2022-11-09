import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import AnimeSeeder from "./db/seeds/AnimeSeeder";

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/db/entities/*.ts"],
  migrations: ["src/db/migrations/*.ts"],
  subscribers: ["src/db/subscribers/*.ts"],
  seeds: ["src/db/seeds/*.ts"],
};

export const dataSource = new DataSource(options);
