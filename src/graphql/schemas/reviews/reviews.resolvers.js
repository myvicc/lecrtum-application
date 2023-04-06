import { withFilter } from 'graphql-subscriptions';

import pubsub from '../../../pubsub';
import { ReviewsService } from '../../../services/reviews.service';

const service = new ReviewsService();

export default {
    Mutation: {
        addReview: (parent, { body }, { user }) => service.addReview(user.id, body)
    },
    Subscription: {
        reviewAdded: {
            subscribe: withFilter(
                (_parent, _variables, { user }) => {
                    if (!user) {
                        throw new Error('Unauthorized');
                    }

                    return pubsub.asyncIterator(['NEW_REVIEW'])
                },
                (payload, variables) => {
                    return (
                        payload.reviewAdded.teacherId.toString() === variables.teacherId
                    );
                },
            ),
        },
    }
};

