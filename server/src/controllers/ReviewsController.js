import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { reviewsService } from "../services/ReviewsService";

export class ReviewsController extends BaseController {
    constructor() {
        super('api/reviews')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createReview)
    }
    async createReview(request, response, next) {
        try {
            const reviewData = request.body
            reviewData.creatorId = request.userInfo.id
            const review = await reviewsService.createReview(reviewData)
            response.send(review)
        } catch (error) {
            next(error)
        }
    }
}