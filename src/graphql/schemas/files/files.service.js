import {TeachersService} from '../teachers/teachers.service';
import {fileTypeIsCorrect, removeFromS3, storeS3} from '../../../utilities';
import {ALLOWED_TYPES} from '../../../constants/allowed.types';
import {File, Student} from '../../../mongo';
import {ObjectId} from 'mongodb';


export class FilesService {
    constructor() {
        this.teacherService = new TeachersService();
    }

    async uploadFile(teacherId, uploadFile) {
        await this.teacherService.findTeacherById(teacherId);
        uploadFile = await uploadFile;

        fileTypeIsCorrect(uploadFile, ALLOWED_TYPES.TEACHER_ALLOWED_FILES);

        const { fileName, path, mimeType } = await storeS3(uploadFile);

        const file = new File({
            fileName,
            mimeType,
            path,
            teacherId,
        });

        await file.save();

        return file.toResponse();
    }


    async getFilesForTeacher(teacherId, fileName) {
        await this.teacherService.findTeacherById(teacherId);
        const searchParams = {
            teacherId,
        };

        if (fileName) {
            searchParams.fileName = { $regex: new RegExp(fileName, 'gi') };
        }

        const files = await File.find(searchParams);

        return files.map(file => file.toResponse());
    }
    async getFilesForStudent(studentId, fileName) {
        await Student.findById(new ObjectId(studentId));
        const searchParams = {
            studentsAccess: studentId,
        };

        if (fileName) {
            searchParams.fileName = { $regex: new RegExp(fileName, 'gi') };
        }

        const files = await File.find(searchParams);
        return files.map(file => file.toResponse());
    }

    async removeFile(teacherId, fileId) {
        const file = await File.findOne({
            _id: new ObjectId(fileId),
            teacherId,
        });

        if (!file) {
            throw new Error('Файл не знайдений');
        }

        await removeFromS3(file.path);

        await File.deleteOne(new ObjectId(fileId));

        return `Файл ${file.fileName} видалено`;
    }
}
