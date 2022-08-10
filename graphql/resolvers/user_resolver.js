const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server')

const {
    validateRegisterInput,
    validateLoginInput
} = require('../../util/validators');
const { SECRET_KEY } = require('../../config')
const User = require('../../models/User');

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

module.exports = {
    Mutation: {
        async register(
            _,
            {
                registerInput: { username, email, password, confirmPassword }
            }) {
            // Validate User Data
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
              );
              if (!valid) {
                throw new UserInputError('Errors', { errors });
              }
            // Ensure User does not already exist

            const user = await User.findOne({ username });
            const validate_email = await User.findOne({ email });
            if (user) {
                throw new UserInputError('User already exists', {
                    errors: {
                        username: 'This username is taken ',
                    }
                });
            } else if (validate_email) {
                throw new UserInputError('User already exists', {
                    errors: {
                        email: 'Email already exists, please login ',
                    }
                });
            }
            // Hash Password
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };

        },
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
      
            if (!valid) {
              throw new UserInputError('Errors', { errors });
            }

            // Look for user in database
            const user = await User.findOne({ username });
            if (!user) {
              errors.general = 'User not found';
              throw new UserInputError('User not found', { errors });
            }
            
            // Compare Password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
              errors.general = 'Wrong crendetials';
              throw new UserInputError('Wrong crendetials', { errors });
            }
      
            const token = generateToken(user);
      
            return {
              ...user._doc,
              id: user._id,
              token
            };
          }
    }
}