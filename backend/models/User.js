const mongoess = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoess.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    aadharcard: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (userPassword) {
    try {
        return await bcrypt.compare(userPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoess.model('User', userSchema);
