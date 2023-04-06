import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    blockedSlots: [mongoose.SchemaTypes.Mixed],
    online: {type: Boolean, default: false}
});

teacherSchema.methods.toResponse = function toResponse() {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        online: this.online,
        blockedSlots: this.blockedSlots.map((slot) => ({
            date: slot.date.toISOString(),
            timeStart: slot.timeStart,
            timeEnd: slot.timeEnd,
        })),
    };
};

export const Teacher = mongoose.model('Teacher', teacherSchema);

