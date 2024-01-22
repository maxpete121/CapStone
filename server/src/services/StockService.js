import { dbContext } from "../db/DbContext"




class StockService{
    async postStock(stockData){
        let newStock = await dbContext.StockParts.create(stockData)
        return newStock
    }

    async getStockByType(type){}
}

export const stockService = new StockService()