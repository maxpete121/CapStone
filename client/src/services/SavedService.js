import { AppState } from "../AppState"
import { Saved } from "../models/Saved"
import { api } from "./AxiosService"


class SavedService{
    async saveItem(itemData){
        let newSaved = {
            "pcId": itemData.id
        }
        let response = await api.post('api/saved', newSaved)
        let returned = new Saved(response.data)
        AppState.savedItems.push(returned)
    }

    async getSaved(accountId){
        let response = await api.get(`api/saved/${accountId}`)
        let allSaved = await response.data.map(saved => new Saved(saved))
        AppState.savedItems = allSaved
    }
}

export const savedService = new SavedService()