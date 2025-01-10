/**
 * User Management API Test Suite
 * 
 * This suite tests the functionality of the User Management API.
 * It includes tests for adding a user, fetching all users, and deleting a user.
 */

const request = require('supertest');
const app = require('../app');

/**
 * Function to generate a random string
 * 
 * @param {number} length - The length of the random string
 * @returns {string} A random string of the specified length
 */
function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

describe('User Management API', () => {
    /**
     * Test for adding a user
     */
    describe('POST /api/users', () => {
        it('should add a user with valid data', async () => {
            const randomMail = `${generateRandomString(10)}@example.com`;
            const response = await request(app)
                .post('/api/users')
                .send({
                    name: 'John Doe',
                    email: randomMail,
                    role: 'Admin',
                });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe('John Doe');
        });

        it('should return 400 for invalid email', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({
                    name: 'John Doe',
                    email: 'invalid-email',
                    role: 'Admin',
                });

            expect(response.status).toBe(400);
        });
    });

    /**
     * Test for fetching all users
     */
    describe('GET /api/users', () => {
        it('should fetch all users', async () => {
            const response = await request(app).get('/api/users');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('should filter users by role', async () => {
            const response = await request(app).get('/api/users?role=Admin');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    /**
     * Test for deleting a user
     */
    describe('DELETE /api/users', () => {
        it('should delete a user with a valid ID', async () => {
            const response = await request(app).delete('/api/users?id=23');
            expect(response.status).toBe(200);
        });

        it('should return 400 if ID is not specified', async () => {
            const response = await request(app).delete('/api/users');
            expect(response.status).toBe(400);
        });

        it('should return 500 if user does not exist', async () => {
            const response = await request(app).delete('/api/users?id=999');
            expect(response.status).toBe(500);
        });
    });
});