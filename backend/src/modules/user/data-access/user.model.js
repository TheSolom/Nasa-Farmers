import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    job: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
}, { timestamps: true });

userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) {
        return false;
    }
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password') && this.password) {
        const SALT_COST_FACTOR = 10;
        const salt = await bcrypt.genSalt(SALT_COST_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = model('User', userSchema);

export default User;
