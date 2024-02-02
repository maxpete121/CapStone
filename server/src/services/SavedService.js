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
}

export const savedService = new SavedService()