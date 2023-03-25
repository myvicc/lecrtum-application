import { LessonsService } from './lessons.service';
import {withFilter} from 'graphql-subscriptions';
import pubsub from '../../../pubsub';

const service = new LessonsService();

export default {
    Mutation: {
        createLesson: (parent, { body }, { user }) => {
            if (user.type !== 'STUDENT') {
                throw new Error('Unauthorized');
            }

            return service.createLesson(user.id, body);
        }
    },
    Subscription: {
        createLesson: {
            subscribe: withFilter(
                (_parent, _variables, { user }) =>  {
                    if (user.type !== 'TEACHER') {
                        throw new Error('This subscription only for teacher');
                    }
                    return pubsub.asyncIterator('NEW_LESSON');
                },
                (payload, variables, { user }) => {
                    return (
                        payload.createLesson.teacherId.toString() === user.id
                    )
                }
            )
        }
    }
};

