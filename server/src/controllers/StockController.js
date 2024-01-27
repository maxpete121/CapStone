import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { stockService } from "../services/StockService";


export class StockController extends BaseController {
    constructor() {
        super('api/stock')
        this.router
            .get('/:type', this.getStockByType)
            .get('/:type/:socket', this.getBySocket)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postStock)
            .put('/:partId', this.editPart)
    }

    async postStock(request, response, next) {
        try {
            let stockData = request.body
            let newPart = await stockService.postStock(stockData)
            response.send(newPart)
        } catch (error) {
            next(error)
        }
    }

    async getStockByType(request, response, next) {
        try {
            let type = request.params.type
            let found = await stockService.getStockByType(type)
            response.send(found)
        } catch (error) {
            next(error)
        }
    }

    async getBySocket(request, response, next) {
        try {
            let type = request.params.type
            let socket = request.params.socket
            let found = await stockService.getBySocket(type, socket)
            response.send(found)
        } catch (error) {
            next(error)
        }
    }

    async editPart(request, response, next) {
        try {
            let partId = request.params.partId
            let editMade = await stockService.editPart(partId)
            response.send(editMade)
        } catch (error) {
            next(error)
        }
    }
}