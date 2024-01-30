import { dbContext } from "../db/DbContext";
import { pcService } from "./PcService";


class ReviewsService {
    async createReview(reviewData) {
        const Pc = await pcService.getOnePc(reviewData.id)
        const review = await dbContext.Reviews.create(reviewData)
        await review.populate('creator', 'name picture')
        return review
    }
    async getReviews(PcId) {
        const reviews = await dbContext.Reviews.find({ PcId: PcId }).populate('creator', 'name picture')
        return reviews
    }
}
export const reviewsService = new ReviewsService()