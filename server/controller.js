import {User } from "../database/model.js";

import { Op } from "sequelize";

const handlerFunction = {
    addUser: async (req, res) => {
        try {
          
          const { username, score } = req.body;
      
          // Check if the user already exists
          const existingUser = await User.findOne({
            where: { username }
          });
      
          if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
          }
      
          // Create a new user
          const newUser = await User.create({ username, score });
      
          // Send success response
          res.status(200).json({
            message: "User added successfully",
            user: newUser,
          });
        } catch (error) {
          console.error('Error adding user:', error);
          res.status(500).json({ message: "Error adding user", error });
        }
      },
      
  getUserInfo: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['username', 'score'],
      });

      // If no users are found
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      // Send the list of users with their username and score
      res.json({ users });
    } catch (error) {
      res.status(500).json({ message: "Error getting users info", error });
    }
  },
};

export default handlerFunction;
