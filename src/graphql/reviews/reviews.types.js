const Review = `
  type Mutation {
    addReview(body: AddReviewBody!): Review
  }

  type Subscription {
    reviewAdded(teacherId: String!): Review
  }

  input AddReviewBody {
    text: String!
    teacherId: String!
  }
`;

export default Review;

