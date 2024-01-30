import { dbContext } from "../db/DbContext.js"




class CartService{
    async getCartItems(accountId){
        let found = await dbContext.CartItems.find({accountId: accountId}).populate('account', 'name picture').populate('pc')
        return found
    }

    async postCartItem(postData, userId){
        if(userId){
            let newItem = await dbContext.CartItems.create(postData)
            await newItem.populate('account', 'name picture')
            await newItem.populate('pc')
            return newItem
        }else{
            throw Error('No ID Found')
        }
    }

    async deleteItem(pcId, userId){
        let found = await dbContext.CartItems.findById(pcId)
        if(userId == found.accountId){
            await found.deleteOne()
            return 'Deleted'
        }else{
            throw Error('Unauthorized')
        }
    }
}

export const cartService = new CartService()