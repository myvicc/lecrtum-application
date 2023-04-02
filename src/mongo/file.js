import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    fileName: String,
    path: String,
    mimeType: String,
    teacherId: mongoose.SchemaTypes.ObjectId,
    studentsAccess: []
});

fileSchema.methods.toResponse = function () {
    return {
        id: this._id,
        fileName: this.fileName,
        path: this.path,
        mimeType: this.mimeType,
        studentsAccess: this.studentsAccess
    };
};

export const File = mongoose.model('File', fileSchema);

