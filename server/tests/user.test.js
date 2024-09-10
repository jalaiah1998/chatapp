const request = require('supertest');
const app = require('../server');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

describe('Users API', () => {
    let adminToken;
    let userId;

    beforeAll(async () => {
        // Create and save an admin user
        const admin = new User({ username: 'admin1', password: await bcrypt.hash('adminpass', 10), role: 'admin' });
        await admin.save();
        adminToken = jwt.sign({ userId: admin._id, role: 'admin' }, 'secret', { expiresIn: '1h' });

        // Create a user for testing
        const user = new User({ username: 'testuser1', password: await bcrypt.hash('testpass', 10), role: 'user' });
        await user.save();
        userId = user._id;
    });

    afterAll(async () => {
        // Clean up test users
        await User.deleteMany({ username: { $in: ['admin1', 'testuser1'] } });
    });

    it('should create a user', async () => {
        const res = await request(app)
            .post('/users/user')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ username: 'newuser1', password: 'newpass', role: 'user' });
        expect(res.statusCode).toEqual(201);
    });

    it('should edit a user', async () => {
        const res = await request(app)
            .put(`/users/user/${userId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ username: 'updateduser' });
        expect(res.statusCode).toEqual(200);

        const updatedUser = await User.findById(userId);
        expect(updatedUser.username).toBe('updateduser');
    });
});
