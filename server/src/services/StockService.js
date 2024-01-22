import { dbContext } from "../db/DbContext"




class StockService{
    async postStock(stockData, userId){
        let newStock = await dbContext.StockParts.create(stockData)
    }
}

export const stockService = new StockService()