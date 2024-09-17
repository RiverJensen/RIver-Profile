// import { DataType , Model } from "sequelize";
// import until from "util";
// import connectToDB from "./db.js";

// export const db = await connectToDB("postgresql:///project_db");

// export class User extends Model {
//     [until.inspect.custom](){
//         return this.toJSON()
//     }
// }

// User.init(
//     {
//         userId: {
//             type: DataType.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         username: {
//             type: DataType.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         score: {
//             type: DataType.INTEGER,
//             allowNull: false,
//         },
//     },

//     {
//         sequelize: db,
//         modelName: "user",
//     }
// )