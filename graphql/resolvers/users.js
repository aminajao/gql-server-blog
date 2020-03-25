const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');

module.exports = {
    Mutation: {

        async login(_, { userName, password }) {
            const { errors, valid } = validateLoginInput(userName, password);
        },

        async registerUser( _, { registerInput: {userName, email, password, confirmPassword}}, context, info ) {
            
            // validate user
            const { errors, valid } = validateRegisterInput(userName, email, password, confirmPassword)
            if(!valid) {
                throw new UserInputError('Errors', { errors })
            }
            
            // username is unique
            const user = await User.findOne({ userName });
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        userName: 'This username is already taken'
                    }
                });
            }
            
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