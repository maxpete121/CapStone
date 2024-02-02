import { dbContext } from "../db/DbContext.js"




class SavedService{
    async postSaved(savedData, userId){
        let newSaved = await dbContext.Saved.create(savedData)
        await newSaved.populate('creator')
        await newSaved.populate('pc')
        return newSaved
    }

    async getSavedByAccount(accountId){
        let savedPosts = await dbContext.Saved.find({accountId: accountId}).populate('creator', 'name picture').populate('pc')
        return savedPosts
    }

    async deleteSaved(savedId, userId){
        let foundSaved = await dbContext.Saved.findById(savedId)
        if(foundSaved.accountId == userId){
            await foundSaved.deleteOne()
            return 'Deleted'
        }else{
            throw Error('You are not authorized to make  this request!')
        }
    }
}

export const savedService = new SavedService()