import { dbContext } from "../db/DbContext.js"




class CartService{
    async getCartItems(accountId){
        let found = await dbContext.CartItems.find({accountId: accountId}).populate('account', 'name picture').populate('pc')
        return found
    }

    async postCartItem(postData, userId){
        let newItem = await dbContext.CartItems.create(postData)
        await newItem.populate('account', 'name picture')
        await newItem.populate('pc')
        return newItem
    }
}

export const cartService = new CartService()