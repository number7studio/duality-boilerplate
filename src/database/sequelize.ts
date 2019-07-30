import { Sequelize } from "sequelize-typescript";
import { get } from "config";

let s;

if (get("databases.auth_postgres.full_uri")) {
  s = new Sequelize(get("databases.auth_postgres.full_uri"), {
    modelPaths: [__dirname + "/models"],
    logging: false
  });
} else {
  s = new Sequelize({
    username: get("databases.auth_postgres.user"),
    password: get("databases.auth_postgres.password"),
    database: get("databases.auth_postgres.database"),
    host: get("databases.auth_postgres.host"),
    dialect: "postgres",
    modelPaths: [__dirname + "/models"],
    logging: false
  });
}

export const sequelize = s;
