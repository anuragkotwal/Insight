const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        trim: true,
        minlength: 8,
    },
    role:{
        type: String,
        required: true,
        default: '0'
    },
    courses:[{
        type: ObjectId,
        // ref:"courses"
    }]
},{
    timestamps: true
});


//Encrypting password before saving to database
userSchema.pre('save',async function(next) {
    const user = this;
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password,8);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;