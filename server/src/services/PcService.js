import { response } from "express"
import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"



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

    // async updatePc(newData, pcId, userId){
    //     let defaultPC = await dbContext.PcBuilds.findById(pcId)
    //     defaultPC.price = newData.price ? defaultPC.price : newData.price
    //     defaultPC.powerScore = newData.powerScore ? defaultPC.powerScore : newData.powerScore
    //     await defaultPC.save()
    //     return defaultPC
    // }

    async addPart(newPart){
        let pc = await dbContext.PcBuilds.findById(newPart.pcId)
        pc.price += newPart.part.price
        pc.powerScore += newPart.part.powerScore
        await pc.save()
    }

    async removePart(deletePart){
        let pc = await dbContext.PcBuilds.findById(deletePart.pcId)
        pc.price -= deletePart.part.price
        pc.powerScore -= deletePart.part.powerScore
        await pc.save()
    }

    async shareBuild(pcId, userId){
        let pc = await dbContext.PcBuilds.findById(pcId)
        await pc.populate('creator')
        if(pc.isShared == false){
            pc.isShared = true
        }else{
            pc.isShared = false
        }
        await pc.save()
        return pc
    }

    async getSharedBuilds(){
        let shared = await dbContext.PcBuilds.find({isShared: true}).populate('creator')
        return shared
    }
}

export const pcService = new PcService()