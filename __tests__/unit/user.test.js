const { beforeEach, expect, it } = require('@jest/globals')
const bcrypt = require('bcryptjs')
const truncate = require('../utils/truncate')
const {User} = require ('../../src/app/models')

describe('User', ()=>{
    beforeEach(async()=>{
        await truncate()
    });

    it('should encrypt user password', async()=>{
        const user = await User.create({name: 'Leo', email: 'abc@gmail.com', password: '123456'})
        
        const compareHash = await bcrypt.compare('123456', user.password_hash)

        expect(compareHash).toBe(true)
    });

})