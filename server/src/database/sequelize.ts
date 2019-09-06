import { Sequelize } from "sequelize-typescript";
import { get } from "config";

let sequelize;

if (get("databases.auth_postgres.full_uri")) {
  sequelize = new Sequelize(get("databases.auth_postgres.full_uri"), {
    modelPaths: [__dirname + "/models"],
    logging: false
  });
} else {
  sequelize = new Sequelize({
    username: get("databases.auth_postgres.user"),
    password: get("databases.auth_postgres.password"),
    database: get("databases.auth_postgres.database"),
    host: get("databases.auth_postgres.host"),
    dialect: "postgres",
    modelPaths: [__dirname + "/models"],
    logging: false
  });
}

export default sequelize;
