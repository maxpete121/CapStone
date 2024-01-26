
import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { StockPart } from "../models/StockPart"
import { NewPart } from "../models/NewPart"


class PartsService {
    async getParts(type) {
        const response = await api.get(`api/stock/${type}`)
        logger.log('getting parts from api in client service', response.data)
        const parts = response.data.map(part => new StockPart(part))
        AppState.currentStock = parts
    }

    async addPartToBuild(partID, buildId){
        console.log(partID)
        let buildData = {
            "partId": partID,
            "pcId": buildId
        }
        let response = await api.post('api/newPart', buildData)
        let newPart = new NewPart(response.data)
        AppState.activeParts.unshift(newPart)
    }

    async getActiveParts(pcId){
        let response = await api.get(`api/newPart/${pcId}`)
        let allParts = response.data.map(part => new NewPart(part))
        AppState.activeParts = allParts
    }
}

export const partsService = new PartsService()