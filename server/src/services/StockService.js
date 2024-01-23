import { dbContext } from "../db/DbContext"




class StockService{
    async postStock(stockData){
        let newStock = await dbContext.StockParts.create(stockData)
        return newStock
    }

    async getStockByType(type){
        let foundParts = await dbContext.StockParts.find({type: type})
        return foundParts
    }
}

export const stockService = new StockService()