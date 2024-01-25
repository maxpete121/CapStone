
import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { StockPart } from "../models/StockPart"


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
    }
}

export const partsService = new PartsService()