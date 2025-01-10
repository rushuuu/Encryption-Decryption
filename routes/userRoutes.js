/**
 * User Router Module
 * 
 * This module defines the routes for user-related operations.
 * 
 * @module userRouter
 */

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * Add a new user.
 * 
 * @route POST /users
 * @access Public
 */
router.post('/users', userController.addUser);

/**
 * Fetch all users.
 * 
 * @route GET /users
 * @access Public
 */
router.get('/users', userController.getAllUsers);

/**
 * Delete a user.
 * 
 * @route DELETE /users
 * @access Public
 */
router.delete('/users', userController.deleteUser);

module.exports = router;