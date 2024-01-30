import { AppState } from "../AppState"
import { Review } from "../models/Review"


class ReviewsService {
    async createReview(reviewData) {
        const response = await api.post('api/reviews', reviewData)
        console.log('baking review', response.data)
        const newReview = new Review(response.data)
        AppState.reviews.push(newReview)
    }
}

export const reviewsService = new ReviewsService()