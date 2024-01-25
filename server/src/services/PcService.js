import { dbContext } from "../db/DbContext.js"



class PcService{
    async postPc(pcData, userId){
        let newPc = (await dbContext.PcBuilds.create(pcData)).populate('creator')
        return newPc
    }

    async getPcs(){
        let allPc = await dbContext.PcBuilds.find().populate('creator')
        return allPc
    }
    
    async getOnePc(pcId){
        let pcFound = await dbContext.PcBuilds.findById(pcId).populate('creator')
        return pcFound
    }

    async deletePc(PcId){
        let foundPc = await dbContext.PcBuilds.findById(PcId)
        await foundPc.deleteOne()
        return foundPc
    }

    async getAccountsPcs(pcId){
        let pcsFound = await dbContext.PcBuilds.find({creatorId: pcId}).populate('creator')
        return pcsFound
    }
}

export const pcService = new PcService()