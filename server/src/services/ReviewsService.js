import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { pcService } from "./PcService";


class ReviewsService {
    async createReview(reviewData) {
        const Pc = await pcService.getOnePc(reviewData.id)
        const review = await dbContext.Reviews.create(reviewData)
        await review.populate('creator', 'name picture')
        return review
    }
    async getReviews(pcId) {
        const reviews = await dbContext.Reviews.find({ pcId: pcId }).populate('creator', 'name picture')
        return reviews
    }
    async deleteReview(reviewId, userId) {
        const review = await dbContext.Reviews.findById(reviewId)
        if (!review) {
            throw new BadRequest(`invalid review id ${reviewId}`)
        }
        if (review.creatorId != userId) {
            throw new Forbidden('Unauthorized...')
        }
        await review.deleteOne()

        //@ts-ignore
        return `Review has been terminated`
    }
}
export const reviewsService = new ReviewsService()