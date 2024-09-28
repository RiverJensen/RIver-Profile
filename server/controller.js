import {User } from "../database/model.js";



const handlerFunction = {
    addUser: async (req, res) => {
        try {
          
          const { username, score } = req.body;
      
          
          const existingUser = await User.findOne({
            where: { username }
          });
      
          if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
          }
      
        
          const newUser = await User.create({ username, score });
      
         
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

     
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      
      res.json({ users });
    } catch (error) {
      res.status(500).json({ message: "Error getting users info", error });
    }
  },
};

export default handlerFunction;



