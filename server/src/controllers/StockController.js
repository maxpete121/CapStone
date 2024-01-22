import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { stockService } from "../services/StockService";


export class StockController extends BaseController{
    constructor(){
        super('api/stock')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.postStock)
        .get('/:type', this.getStockByType)
    }

    async postStock(request, response, next){
        try {
            let stockData = request.body
            let newPart = await stockService.postStock(stockData)
            response.send(newPart)
        } catch (error) {
            next(error)
        }
    }

    async getStockByType(request, response, next){
        try {
            let type = request.params.type
            let found = await stockService.getStockByType(type)
        } catch (error) {
            next(error)
        }
    }
}