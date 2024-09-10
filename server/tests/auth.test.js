const request = require('supertest');
const app = require('../server');



describe('Auth API', () => {
    it('should register a user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'testpass2', password: 'testuser', role: 'user' });
        expect(res.statusCode).toEqual(201);
        expect(res.text).toBe('User created');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'testpass' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should logout a user', async () => {
        const loginRes = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'testpass' });

        const token = loginRes.body.token;

        const logoutRes = await request(app)
            .post('/auth/logout')
            .set('Authorization', `Bearer ${token}`);

        expect(logoutRes.statusCode).toEqual(200);
        expect(logoutRes.text).toBe('Logged out successfully');
    });
});
