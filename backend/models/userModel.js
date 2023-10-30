import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);        //This compares the passwords if we use matchPassword in the controller
}

// Hashing the password with pre so that it is hashed before it is saved to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next(); //If the password is not being modified, move on to the next peice of middleware
    }

    // if it is being modified, we will hash it for this(the current user we are saving)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
 });

const User = mongoose.model("user", userSchema);

export default User;

