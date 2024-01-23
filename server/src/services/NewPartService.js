import { dbContext } from "../db/DbContext.js"


class NewPartService{
    async postNewPart(newData, userId){
        let newPart = (await dbContext.NewParts.create(newData)).populate('part')
        if((await newPart).accountId == userId){
            return newPart
        }else{
            throw Error('Unauthorized')
        }
    }

    async deleteNewPart(partId, userId){
        let deletePart = await dbContext.NewParts.findById(partId)
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