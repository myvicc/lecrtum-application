import { TeachersService } from './teachers.service';
import {USER_TYPES} from '../../constants/user.types';
import {checkUserType} from '../../utilities';
import teachersSchema from './teachers.schema';



const service = new TeachersService();

export default {
    Query: {
        teacher: (parent, { id }) => service.getTeacher(id),
        getLessons: (parent, variables, { user }) => {
            checkUserType(user, USER_TYPES.TEACHER);

            return service.getLessons(user.id);
        },
        getUploadFiles: (parent, { fileName }, { user }) => {
            checkUserType(user, USER_TYPES.TEACHER);


            return service.getUploadFiles(user.id, fileName);
        }
    },
    Mutation: {
        updateTeacherUsername: (parent, { username }, { user }) => {
            checkUserType(user, USER_TYPES.TEACHER);

            return service.updateUsername(user.id, username);
        },
        addBlockedSlot: (parent, { body }, { user }) => {
            checkUserType(user, USER_TYPES.TEACHER);

            return service.addBlockedSlot(user.id, body);
        },
        uploadFile: async (parent, {file}, {user}) => {
            checkUserType(user, USER_TYPES.TEACHER);

            return service.uploadFile(user.id, file);
        },
        deleteFile: (parent, { fileId }, { user }) => {
            checkUserType(user, USER_TYPES.TEACHER);
            return service.deleteFile(user.id, fileId)
        }
    }
};

