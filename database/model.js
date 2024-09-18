import { DataTypes, Model } from "sequelize";

// import { DataType } from "sequelize";
import until from "util";
import connectToDB from "./db.js";

export const db = await connectToDB("postgresql:///riverproject_db");

export class User extends Model {
    [until.inspect.custom](){
        return this.toJSON()
    }
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },

    {
        sequelize: db,
        modelName: "user",
    }
)

console.log('User:', User);  // Should print the User model or undefined if not exported correctly


export default User