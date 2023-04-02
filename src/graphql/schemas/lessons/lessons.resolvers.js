import { withFilter } from 'graphql-subscriptions';

import pubsub from '../../../pubsub';
import { LessonsService } from './lessons.service';

const service = new LessonsService();

export default {
    Query: {
        teacherLessons: (_parent, _variables, { user }) => {
            return service.getTeachersLesson(user.id);
        },
    },
    Mutation: {
        createLesson: (parent, { body }, { user }) => service.createLesson(user.id, body)
    },
    Subscription: {
        newLesson: {
            subscribe: withFilter(
                (_parent, _variables, { user }) => {
                    return pubsub.asyncIterator(['NEW_LESSON'])
                },
                (payload, _variables, { user }) => {
                    return (
                        payload.newLesson.teacherId.toString() === user.id
                    );
                },
            ),
        },
    },
};


