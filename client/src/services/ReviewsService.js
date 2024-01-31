import { AppState } from "../AppState"
import { Review } from "../models/Review"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ReviewsService {
    async createReview(reviewData, pcID) {
        reviewData.pcId = pcID
        console.log('test', reviewData)
        const response = await api.post('api/reviews', reviewData)
        console.log('baking review', response.data)
        const newReview = new Review(response.data)
        AppState.reviews.push(newReview)
    }
    async getPcReviews(PcId) {
        const response = await api.get(`api/builds/${PcId}/reviews`)
        console.log(PcId)
        console.log('Getting reviews for this PC', response.data)
        let reviews = response.data.map(review => new Review(review))
        AppState.reviews = reviews
    }
    async deleteReview(reviewId) {
        const response = await api.delete(`api/reviews/${reviewId}`)
        logger.log('deleting review', response.data)
        const indexToRemove = AppState.reviews.findIndex(review => review.id == reviewId)
        if (indexToRemove > -1) {
            AppState.reviews.splice(indexToRemove, 1)
        }
    }
}

export const reviewsService = new ReviewsService()