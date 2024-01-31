import { AppState } from "../AppState";
import { Cart } from "../models/Cart";
import { api } from "./AxiosService";





class CartService{
    async getCartItems(userId){
        let response = await api.get(`api/cart/${userId}`)
        let newItems = response.data.map(item => new Cart(item))
        AppState.cartItems = newItems
    }

    async addItem(pcId){
        let newItem = {
            "pcId": pcId
        }
        let response = await api.post(`api/cart`, newItem)
        let returnItem = new Cart(response.data)
        AppState.cartItems.push(returnItem)
    }

    async deleteItem(itemId){
        let response = await api.delete(`api/cart/${itemId}`)
        let itemIndex = AppState.cartItems.findIndex(item => item.id == itemId)
        AppState.cartItems.splice(itemIndex, 1)
    }
}


export const cartService = new CartService()