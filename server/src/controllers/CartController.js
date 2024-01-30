import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { cartService } from "../services/CartService.js";




export class CartController extends BaseController{
    constructor(){
        super('api/cart')
        this.router
        .get('/:accountId', this.getCartItems)
        .use(Auth0Provider.getAuthorizedUserInfo)
    }

    async getCartItems(request, response, next){
        try {
            let accountId = request.params.accountId
            let items = await cartService.getCartItems(accountId)
            response.send(items)
        } catch (error) {
            next(error)
        }
    }
}