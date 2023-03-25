import { TeachersService } from './teachers.service';
import {Lesson, Teacher} from '../../mongo';
import {ObjectId} from 'mongodb';
import e from 'express';
import {withFilter} from 'graphql-subscriptions';
import pubsub from '../../../pubsub';

const service = new TeachersService();

export default {
    Query: {
        teacher: (parent, { id }) => service.getTeacher(id),
        teachersLessons: async (parent, { id }) => {
            const teacher = await Teacher.findById(new ObjectId(id));
            if (!teacher) {
                throw new Error('Викладач не знайдений');
            }
            const existingLessons = await Lesson.find({teacherId: id});
            if (!existingLessons) {
                throw new Error('У викладача не має уроків');
            }
            return existingLessons;

        }
    },
    Mutation: {
        updateTeacherUsername: (parent, { username }, { user }) => {
            if (user.type !== 'TEACHER') {
                throw new Error('Unauthorized');
            }

            return service.updateUsername(user.id, username);
        },
        addBlockedSlot: (parent, { body }, { user }) => {
            if (user.type !== 'TEACHER') {
                throw new Error('Unauthorized');
            }

            return service.addBlockedSlot(user.id, body);
        }
    }
};

