/**
 * User Controller
 * 
 * Handles user-related operations such as adding, fetching, and deleting users.
 */

const userService = require('../services/userService');
const Joi = require('joi');

/**
 * Add a User
 * 
 * Creates a new user with the provided details.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.addUser = async (req, res) => {
    // Define the schema for validating user data
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().valid('Admin', 'Editor', 'Viewer').required(),
    });

    try {
        // Validate request body
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // Call the service to add a user
        const user = await userService.addUser(value);
        return res.status(201).json(user);
    } catch (err) {
        // Handle internal server error
        console.log(err);
        return res.status(500).json({ error: 'Failed to add user' });
    }
};

/**
 * Fetch All Users
 * 
 * Retrieves a list of all users, optionally filtered by role.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getAllUsers = async (req, res) => {
    try {
        // Get the optional role filter from the query parameters
        const role = req.query.role;

        // Call the service to fetch users
        const users = await userService.getAllUsers(role);
        return res.status(200).json(users);
    } catch (err) {
        // Handle internal server error

        console.log(err);
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
};

/**
 * Delete a User
 * 
 * Deletes a user by ID.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.deleteUser = async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const id = req.query.id;
        if (!id) return res.status(400).json({ message: 'Id not specified' })

        // Call the service to delete the user
        await userService.deleteUser(id);
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        // Handle internal server error
        return res.status(500).json({ error: 'Failed to delete user' });
    }
};