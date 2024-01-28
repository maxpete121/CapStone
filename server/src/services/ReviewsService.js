import { dbContext } from "../db/DbContext";
import { pcService } from "./PcService";


class ReviewsService {
    async createReview(reviewData) {
        // const Pc = await pcService.getOnePc(reviewData.id)
        const review = await dbContext.Reviews.create(reviewData)
        await review.populate('creator', 'name picture')
        return review
    }
}
export const reviewsService = new ReviewsService()