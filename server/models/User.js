const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        index: true
    },
    //pass is hashed with bcrypt
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String,
        birthday: Date
    },
    follows: [Schema.Types.ObjectId],
    followers: [Schema.Types.ObjectId],
    status: { type: Boolean, default: true },
    accType: {
        type: String,
        enum: ['FREE', 'PREMIUM', 'TRIAL'],
        default: 'FREE'
    },
    ROLE: {
        type: String,
        enum: ['BASIC_USER', 'ADMIN','PREMIUM_USER'],
        default: 'BASIC_USER'
    }

    }, 
{
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword  = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }

})

UserSchema.methods.isValidPassword = async function (password){
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const User = mongoose.model('user', UserSchema)
module.exports = User  