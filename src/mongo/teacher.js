import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    blockedSlots: [mongoose.SchemaTypes.Mixed],
});

teacherSchema.methods.toResponse = function toResponse() {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        blockedSlots: this.blockedSlots.map((slot) => ({
            date: slot.date.toISOString(),
            timeStart: slot.timeStart,
            timeEnd: slot.timeEnd,
        })),
    };
};

export const Teacher = mongoose.model('Teacher', teacherSchema);

