const request = require('supertest');
const app = require('../server');
const Message = require('../models/message');
const Group = require('../models/group');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

describe('Messages API', () => {
    let userToken;
    let groupId;
    let userId;

    beforeAll(async () => {
        const user = new User({ username: 'testuser8', password: 'testpass', role: 'user' });
        await user.save();
        userId = user._id;
        userToken = jwt.sign({ userId: user._id, role: 'user' }, 'secret', { expiresIn: '1h' });

        const group = new Group({ name: 'testgroup3' });
        await group.save();
        groupId = group._id;
    });

    it('should send a message', async () => {
        const res = await request(app)
            .post('/messages/send')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ groupId, content: 'Hello, world!' });
        expect(res.statusCode).toEqual(201);
        expect(res.text).toBe('Message sent');
    });

    it('should like a message', async () => {
        const message = new Message({ group: groupId, sender: userId, content: 'Hello, world!' });
        await message.save();

        const res = await request(app)
            .post(`/messages/${message._id}/like`)
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Message liked');
    });
});
