import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    text: String,
    studentId: mongoose.SchemaTypes.ObjectId,
    teacherId: mongoose.SchemaTypes.ObjectId,
});

reviewSchema.methods.toResponse = function toResponse() {
    return {
        id: this._id,
        date: this.date.toISOString(),
        text: this.text,
        studentId: this.studentId,
        teacherId: this.teacherId,
    };
};

export const Review = mongoose.model('Review', reviewSchema);

