import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

teacherSchema.methods.toResponse = function toResponse() {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
    };
};

export const Teacher = mongoose.model('Teacher', teacherSchema);
