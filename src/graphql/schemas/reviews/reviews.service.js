import { ObjectId } from 'mongodb';
import pubsub from '../../../pubsub';

import { Review, Teacher } from '../../../mongo';

export class ReviewsService {
    async addReview(studentId, body) {
        const { text, teacherId } = body;

        const teacher = await Teacher.findById(new ObjectId(teacherId));

        if (!teacher) {
            throw new Error('Викладач не знайдений');
        }

        const review = new Review({
            text,
            teacherId,
            studentId
        });

        await review.save();

        await pubsub.publish('NEW_REVIEW', { reviewAdded: review.toResponse() });

        return review.toResponse();
    }
}

