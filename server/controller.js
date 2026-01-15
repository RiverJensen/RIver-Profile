import {User } from "../database/model.js";



const handlerFunction = {
    addUser: async (req, res) => {
        try {
          const { username, score } = req.body;
      
          // Input validation
          if (!username || typeof username !== 'string' || username.trim().length === 0) {
            return res.status(400).json({ message: "Username is required and must be a non-empty string" });
          }
      
          if (typeof score !== 'number' || score < 0 || !Number.isInteger(score)) {
            return res.status(400).json({ message: "Score must be a non-negative integer" });
          }
      
          // Check for existing user
          const existingUser = await User.findOne({
            where: { username: username.trim() }
          });
      
          if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
          }
      
          // Create new user
          const newUser = await User.create({ 
            username: username.trim(), 
            score: Math.floor(score) 
          });
      
          res.status(201).json({
            message: "User added successfully",
            user: newUser,
          });
        } catch (error) {
          console.error('Error adding user:', error);
          res.status(500).json({ 
            message: "Error adding user", 
            error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
          });
        }
      },
      
  getUserInfo: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['username', 'score'],
        order: [['score', 'DESC']], // Sort by score descending
      });

      // Return empty array instead of 404 - this is more RESTful
      res.json({ users: users || [] });
    } catch (error) {
      console.error('Error getting users info:', error);
      res.status(500).json({ 
        message: "Error getting users info", 
        error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
      });
    }
  },
};

export default handlerFunction;



