import { AppState } from "../AppState"
import { PcList } from "../models/PcList"
import { api } from "./AxiosService"



class PcService{
    async createNewList(listData){
        let response = await api.post('api/builds', listData)
        let newList = new PcList(response.data)
        AppState.userBuilds.unshift(newList)
    }

    async getLists(accountId){
        let response = await api.get(`account/${accountId}`)
        let allBuilds = response.data.map(build => new PcList(build))
        AppState.userBuilds = allBuilds
    }

    async deletePc(pcId){
        let response = await api.delete(`api/builds/${pcId}`)
        let pcIndex = AppState.userBuilds.findIndex(pc => pc.id == pcId)
        AppState.userBuilds.splice(pcIndex, 1)
    }

    async viewBuild(buildId){
        let response = await api.get(`api/builds/${buildId}`)
        let activeList = new PcList(response.data)
        AppState.activeBuild = activeList
    }
}


export const pcService = new PcService()