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
        getLessons: (parent, variables, { user }) => {
            if (user.type !== 'TEACHER') {
                throw new Error('Unauthorized');
            }
            return service.getLessons(user.id);
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

