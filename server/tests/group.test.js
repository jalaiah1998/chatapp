const request = require('supertest');
const app = require('../server');
const Group = require('../models/group');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

describe('Groups API', () => {
    let userToken;

    beforeAll(async () => {
        const user = new User({ username: 'testuser6', password: 'testpass', role: 'user' });
        await user.save();
        userToken = jwt.sign({ userId: user._id, role: 'user' }, 'secret', { expiresIn: '1h' });
    });

    it('should create a group', async () => {
        const res = await request(app)
            .post('/groups/create-group')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ name: 'testuser6' });
        expect(res.statusCode).toEqual(201);
    });

    it('should add a member to the group', async () => {
        const group = await Group.findOne({ name: 'testuser6' });
        const user = await User.findOne({ username: 'testuser' });
        const res = await request(app)
            .post(`/groups/${group._id}/members`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ userId: user._id });
        expect(res.statusCode).toEqual(200);
    });

    it('should delete a group', async () => {
        const group = await Group.findOne({ name: 'testuser6' });
        const res = await request(app)
            .delete(`/groups/${group._id}`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toEqual(200);
    });
});
