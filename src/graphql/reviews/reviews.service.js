import { Review, Teacher } from '../../mongo';
import { ObjectId } from 'mongodb';
import pubsub from '../../../pubsub';

export class ReviewsService {

    /**
     * @param { String } studentId
     * @param {{text:String, teacherId: String, id: ObjectId}} body
     * @returns {Promise<Review.toResponse()>}
     */
    async addReview(studentId, body) {
        const {text, teacherId} = body;

        const teacher = await Teacher.findById(new ObjectId(teacherId));

        if (!teacher) {
            throw new Error('Викладач не знайденний');
        }

        const review = new Review({
            text,
            teacherId,
            studentId
        });

        await review.save();

        await pubsub.publish('NEW_REVIEW', {reviewAdded: review.toResponse()});

        return review.toResponse();
    }

}
