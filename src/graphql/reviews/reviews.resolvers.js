import { ReviewsService } from './reviews.service';
import pubsub from '../../../pubsub';
import { withFilter } from 'graphql-subscriptions';

const service = new ReviewsService();

export default {
    Mutation: {
        addReview: (parent, {body}, {user}) => {
            if (user.type !== 'STUDENT') {
                throw new Error('Unauthorized');
            }

            return service.addReview(user.id, body);
        }
    },
    Subscription: {
        reviewAdded: {
            subscribe: withFilter(
                (_parent, _variables, { user }) =>  {
                    if (!user) {
                        throw new Error('Unauthorized');
                    }

                    return pubsub.asyncIterator('NEW_REVIEW');
                },
                (payload, variables) => {
                    return (
                        payload.reviewAdded.teacherId.toString() === variables.teacherId
                    )
                }
            )
        }
    }
}
