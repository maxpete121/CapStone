import { Auth0Provider } from "@bcwdev/auth0provider";
import { savedService } from "../services/SavedService.js";
import BaseController from "../utils/BaseController.js";





export class SavedController extends BaseController{
    constructor(){
        super('api/saved')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .get('/:accountId', this.getSavedByAccount)
        .post('', this.postSaved)
        .delete('savedId', this.deleteSaved)
    }

    async postSaved(request, response, next){
        try {
            let savedData = request.body
            let userId = request.userInfo.id 
            savedData.accountId = userId
            let posted = await savedService.postSaved(savedData, userId)
            response.send(posted)
        } catch (error) {
            next(error)
        }
    }

    async getSavedByAccount(request, response, next){
        try {
            let accountId = request.params.accountId
            let savedPcs = await savedService.getSavedByAccount(accountId)
            response.send(savedPcs)
        } catch (error) {
            next(error)
        }
    }

    async deleteSaved(request, response, next){
        try {
            let savedId = request.params.savedId
            let userId = request.userInfo.id 
            let deleted = await savedService.deleteSaved(savedId, userId)
            response.send(deleted)
        } catch (error) {
            next(error)
        }
    }
}