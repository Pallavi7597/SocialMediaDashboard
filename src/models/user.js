// user.js

// Placeholder data - Simulating user data
let users = [
    { id: 1, username: 'john_doe', email: 'john@example.com' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com' },
    // Add more sample users here
  ];
  
  // User model functions
  const userModel = {
    // Get all users
    getAllUsers: () => {
      return users;
    },
  
    // Get user by ID
    getUserById: (userId) => {
      return users.find((user) => user.id === userId);
    },
  
    // Create a new user
    createUser: (username, email) => {
      const newUser = {
        id: users.length + 1,
        username,
        email,
      };
      users.push(newUser);
      return newUser;
    },
  
    // Update user by ID
    updateUserById: (userId, newData) => {
      const user = users.find((user) => user.id === userId);
  
      if (user) {
        Object.assign(user, newData);
        return user;
      } else {
        return null;
      }
    },
  
    // Delete user by ID
    deleteUserById: (userId) => {
      const index = users.findIndex((user) => user.id === userId);
  
      if (index !== -1) {
        users.splice(index, 1);
        return true;
      } else {
        return false;
      }
    },
  };
  
  module.exports = userModel;
  