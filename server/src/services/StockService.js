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


    async getBySocket(type, socket){
        let foundParts = await dbContext.StockParts.find({type: type, chipSet: socket})
        return foundParts
    }

    async editPart(partId){
        let partChange
    }
}

export const stockService = new StockService()