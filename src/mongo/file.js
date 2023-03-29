import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    fileName: String,
    path: String,
    mimeType: String,
    teacherId: mongoose.SchemaTypes.ObjectId
});

fileSchema.methods.toResponse = function () {
    return {
        id: this._id,
        fileName: this.fileName,
        path: this.path,
        mimeType: this.mimeType
    };
};

export const File = mongoose.model('File', fileSchema);

