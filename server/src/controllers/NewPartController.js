import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { newPartService } from "../services/NewPartService.js";




export class NewPartController extends BaseController{
    constructor(){
        super('api/newPart')
        this.router
        .get('/:PcId', this.getPartByPc)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.postNewPart)
        .delete('/:partId', this.deleteNewPart)
    }

    async postNewPart(request, response, next){
        try {
            let userId = request.userInfo.id
            let newData = request.body
            newData.accountId = userId
            let newPart = await newPartService.postNewPart(newData, userId)
            response.send(newPart)
        } catch (error) {
            next(error)
        }
    }

    async deleteNewPart(request, response, next){
        try {
            let userId = request.userInfo.id
            let partId = request.params.partId
            let deleted = await newPartService.deleteNewPart(partId, userId)
            response.send(deleted)
        } catch (error) {
            next(error)
        }
    }

    async getPartByPc(request, response, next){
        try {
            let PcId = request.params.PcId
            let parts = await newPartService.getPartByPc(PcId)
            response.send(parts)
        } catch (error) {
            next(error)
        }
    }
}