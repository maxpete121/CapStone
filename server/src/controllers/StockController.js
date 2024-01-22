import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { stockService } from "../services/StockService";


export class StockController extends BaseController{
    constructor(){
        super('api/stock')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.postStock)
    }

    async postStock(request, response, next){
        try {
            let stockData = request.body
            let userId = request.userInfo.id
            let newPart = await stockService.postStock(stockData, userId)
        } catch (error) {
            next(error)
        }
    }
}