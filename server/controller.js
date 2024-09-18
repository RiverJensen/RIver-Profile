import {User } from "../database/model.js";

import { Op } from "sequelize";

const handlerFunction = {
  addUser: async (req, res) => {
    try {
      console.log(req.body);
      const { username, score } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({
        where: {
          username: username,
        },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create a new user
      await User.create({
        username: username,
        score: score,
      });

      // Find the newly created user
      const user = await User.findOne({
        where: {
          username: username,
        },
      });

      // Send success response
      res.json({
        message: "User added successfully",
        status: 200, // Fixed typo from 'statuse'
        user: user,
      });
    } catch (error) {
      res.status(500).json({ message: "Error adding user", error });
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const users = await User.findAll({
        where: {
          username: username,
          score: score,
          userId: userId,
        },
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
