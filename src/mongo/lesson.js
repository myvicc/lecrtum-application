import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    date: Date,
    timeStart: Number,
    timeEnd: Number,
    studentId: mongoose.SchemaTypes.ObjectId,
    teacherId: mongoose.SchemaTypes.ObjectId,
});

lessonSchema.methods.toResponse = function toResponse() {
    return {
        id: this._id,
        date: this.date.toISOString(),
        timeStart: this.timeStart,
        timeEnd: this.timeEnd,
        studentId: this.studentId,
        teacherId: this.teacherId,
    };
};

export const Lesson = mongoose.model('Lesson', lessonSchema);


