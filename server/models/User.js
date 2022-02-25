 import mongoose from 'mongoose';
 import bcrypt from 'bycrypt';

const { Schema } = mongoose;

  const userSchema = new Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    //pass is hashed with bcrypt
    password: { type: String, required: true },
    email: {type: String, required: true},
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String,
        birthdate: Date
    },
    follows: [Schema.Types.ObjectId],
    followers: [Schema.Types.ObjectId],
    status: {type: Boolean, default: true},
    accType: {
        type: String,
        enum: ['FREE', 'PREMIUM','TRIAL'],
        default: 'FREE'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
        
},{
    timestamps:true
  });

  UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
 	   return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model("User", UserSchema);