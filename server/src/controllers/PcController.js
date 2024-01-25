import { Auth0Provider } from "@bcwdev/auth0provider";
import { pcService } from "../services/PcService.js";
import BaseController from "../utils/BaseController.js";


export class PcController extends BaseController{
    constructor(){
        super('api/builds')
        this.router
        .get('', this.getPcs)
        .get('/:PcId', this.getOnePc)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.postPc)
        .delete('/:PcId', this.deletePc)
    }

    async postPc(request, response, next){
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

    async getPcs(request, response, next){
        try {
            let allPc = await pcService.getPcs()
            response.send(allPc)
        } catch (error) {
            next(error)
        }
    }

    async getOnePc(request, response, next){
        try {
            let PcId = request.params.PcId
            let foundPc = await pcService.getOnePc(PcId)
            response.send(foundPc)
        } catch (error) {
            next(error)
        }
    }

    async deletePc(request, response, next){
        try {
            let PcId = request.params.PcId
            let deleted = await pcService.deletePc(PcId)
            response.send(deleted)
        } catch (error) {
            next(error)
        }
    }
}