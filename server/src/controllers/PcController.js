import { Auth0Provider } from "@bcwdev/auth0provider";
import { pcService } from "../services/PcService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";
import { reviewsService } from "../services/ReviewsService.js";


export class PcController extends BaseController {
    constructor() {
        super('api/builds')
        this.router
            .get('/:PcId', this.getOnePc)
            .get('/shared/true', this.getSharedBuilds)
            .get('/:PcId/reviews', this.getPcReviews)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postPc)
            .delete('/:PcId', this.deletePc)
            .put('/:pcId', this.shareBuild)
            .put('/rating/:pcId', this.reviewUpdate)
            
    }

    async postPc(request, response, next) {
        try {
            let userId = request.userInfo.id
            let pcData = request.body
            pcData.creatorId = userId
            let posted = await pcService.postPc(pcData, userId)
            response.send(posted)
        } catch (error) {
            next(error)
        }
    }

    async getPcs(request, response, next) {
        try {
            let allPc = await pcService.getPcs()
            response.send(allPc)
        } catch (error) {
            next(error)
        }
    }

    async getOnePc(request, response, next) {
        try {
            let PcId = request.params.PcId
            let foundPc = await pcService.getOnePc(PcId)
            response.send(foundPc)
        } catch (error) {
            next(error)
        }
    }

    async deletePc(request, response, next) {
        try {
            let PcId = request.params.PcId
            let deleted = await pcService.deletePc(PcId)
            response.send(deleted)
        } catch (error) {
            next(error)
        }
    }

    async shareBuild(request, response, next) {
        try {
            let pcId = request.params.pcId
            let userId = request.userInfo.id
            let shared = await pcService.shareBuild(pcId, userId)
            response.send(shared)
        } catch (error) {
            next(error)
        }
    }

    async getSharedBuilds(request, response, next) {
        try {
            let pc = await pcService.getSharedBuilds()
            response.send(pc)
        } catch (error) {
            next(error)
        }
    }

    async getPcReviews(request, response, next) {
        try {
            let PcId = request.params.PcId
            const reviews = await reviewsService.getReviews(PcId)
            response.send(reviews)
        } catch (error) {
            next(error)
        }
    }

    async reviewUpdate(request, response, next){
        try {
            let newPC = request.body
            let pcId = request.params.pcId
            let userId = request.userInfo.id
            let updatedBuild = await pcService.reviewUpdate(pcId, newPC, userId)
            response.send(updatedBuild)      
        } catch (error) {
            next(error)
        }
    }
}