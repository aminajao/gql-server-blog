const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

module.exports = {
    Mutation: {
        async registerUser( _, { registerInput: {userName, email, password, confirmPassword}}, context, info ) {
            // validate user
            // username is unique
            // hash password and create auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                password,
                userName,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save()

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                userName: res.userName
            }, SECRET_KEY, { expiresIn: '1h'});

            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
            
        
    }
}