const request = require('supertest')
const factory = require('../utils/factories')
const app = require('../../src/app')
const { expect, beforeEach, it } = require('@jest/globals')
const truncate = require('../utils/truncate')


describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });

    test('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', { password: '123123' })

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123123'
        })

        expect(response.status).toBe(200)
    });


    test('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', {
            password: '123456'
        })

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123123'
        })

        expect(response.status).toBe(401)
    })

    it('should return jwt token when authenticated', async () => {
        const user = await factory.create('User', { password: '123123' })

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123123'
        })

        expect(response.body).toHaveProperty('token');

    })

    it('should be able to access route when authenticated', async ()=>{
        const user = await factory.create('User', { password: '123123' })

        const response = await request(app).get('/dashboard')
        .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200);
    })

    it('should not be able to access route without jwt token', async ()=>{
        const response = await request(app).get('/dashboard')
       
        expect(response.status).toBe(401);
    })

    it('should not be able to access route without jwt token valid', async ()=>{
        const response = await request(app).get('/dashboard')
        .set('Authorization', `Bearer 123123123`)
       
        expect(response.status).toBe(401);
    })
})
