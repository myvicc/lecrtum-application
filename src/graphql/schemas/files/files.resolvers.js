import {FilesService} from './files.service';
import {USER_TYPES} from '../../../constants/user.types';

const service = new FilesService();

export default {
    Query: {
        getFiles: (parent, { fileName }, { user }) => {
            if (!user) {
                throw new Error('Unauthorized');
            }
            if (user.type === USER_TYPES.TEACHER) {
                return service.getFilesForTeacher(user.id, fileName)
            }
            else {
                return service.getFilesForStudent(user.id, fileName)
            }
        }
    },
    Mutation: {
        uploadFile: async (parent, { file }, { user }) => service.uploadFile(user.id, file),
        removeFile: async (parent, { fileId }, { user }) => service.removeFile(user.id, fileId)
    }
};
