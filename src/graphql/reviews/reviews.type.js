const Review = `
    type Mutation {
        addReview(body: AddReviewBody!): Review
    }
    
    input AddReviewBody {
        text: String!
        teacherId: String!
    } 
    
    type Subscription {
        reviewAdded(teacherId: String!): Review
    }
`;

export default Review;
