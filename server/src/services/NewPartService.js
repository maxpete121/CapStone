import { dbContext } from "../db/DbContext.js"
import { pcService } from "./PcService.js"


class NewPartService{
    async postNewPart(newData, userId){
        let newPart = await dbContext.NewParts.create(newData)
        await newPart.populate('part')
        if( newPart.accountId == userId){
            pcService.addPart(newPart)
            return newPart
        }else{
            throw Error('Unauthorized')
        }
    }

    async deleteNewPart(partId, userId){
        let deletePart = await dbContext.NewParts.findById(partId)
        await deletePart.populate('part')
        pcService.removePart(deletePart)
        if(deletePart.accountId == userId){
            await deletePart.deleteOne()
            return 'Deleted'
        }else{
            throw Error('Unauthorized')
        }
    }

    async getPartByPc(PcId){
        let foundParts = await dbContext.NewParts.find({pcId: PcId}).populate('part')
        return foundParts
    }
}

export const newPartService = new NewPartService()