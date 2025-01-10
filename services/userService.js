/**
 * User Service: Handles user-related operations.
 */

const User = require('../models/user');

/**
 * Creates a new user.
 * 
 * @param {Object} userData - User data to be created.
 * @returns {Promise} Created user's id.
 */

exports.addUser = async (userData) => {
    const user = await User.create(userData);
    return user.id; // Return only the ID of the created user
};


/**
 * Retrieves all users based on the provided role.
 * 
 * @param {String} [role] - Optional role to filter users.
 * @returns {Promise} Array of users.
 */
exports.getAllUsers = async (role) => {
    const whereClause = role ? { where: { role } } : {};
    return await User.findAll(whereClause);
};

/**
 * Deletes a user by ID.
 * 
 * @param {Number} id - ID of the user to be deleted.
 * @throws {Error} If the user is not found.
 */
exports.deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.destroy();
};