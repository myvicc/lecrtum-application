import {Student, Teacher} from '../mongo';
import {USER_TYPES} from '../constants/user.types';

export class StatsService {

    async getUserStats(type) {
        const model = type === USER_TYPES.STUDENT ? Student : Teacher;

        const [total, online] = await Promise.all([
            model.countDocuments().exec(),
            model.countDocuments({online: true}).exec()
        ]);

        return {
            total,
            online
        }
    }
    countStudents({online}) {
        const params = {};

        if (online !== undefined) {
            params.online = online;
        }
        return Student.countDocuments(params).exec();
    }

    countTeacher({online}) {
        const params = {};

        if (online !== undefined) {
            params.online = online;
        }
        return Teacher.countDocuments(params).exec();
    }
}
