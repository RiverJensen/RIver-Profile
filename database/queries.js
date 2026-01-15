import { User } from './model.js';

/**
 * Example query functions for User model
 * These can be used as reference or imported where needed
 */

export const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: { username }
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      order: [['score', 'DESC']]
    });
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};