import { Sequelize } from "sequelize";

async function connectToDB(dbURI) {
  console.log(`Connecting to database: ${dbURI}`);

  const sequelize = new Sequelize(dbURI, {
    logging: console.log,
    define: {
      underscored: true,
      timestamps: false,
    },
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  return sequelize;
}

export default connectToDB;
