import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { PcList } from "../models/PcList"
import { api } from "./AxiosService"
import { reviewsService } from "./ReviewsService"



class PcService{
    async createNewList(listData){
        let response = await api.post('api/builds', listData)
        let newList = new PcList(response.data)
        AppState.userBuilds.unshift(newList)
    }

    async getLists(accountId){
        let response = await api.get(`account/${accountId}`)
        let allBuilds = response.data.map(build => new PcList(build))
        AppState.userBuilds = allBuilds.reverse()
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

    async updateBuild(partInfo, pcId){
        let pc = AppState.activeBuild
        pc.price += partInfo.price
        pc.powerScore += partInfo.powerScore
    }

    async updateDelete(partInfo){
        let pc = AppState.activeBuild
        pc.price -= partInfo.price
        pc.powerScore -= partInfo.powerScore
    }

    async shareBuild(pcId, pcData){
        let response = await api.put(`api/builds/${pcId}`, pcData)
        let updatedList = await new PcList(response.data)
        AppState.userBuilds = AppState.userBuilds.map(build => build.id !== pcId ? build : updatedList)
    }

    async getSharedBuilds(){
        let response = await api.get('api/builds/shared/true')
        let builds = response.data.map(build => new PcList(build))
        AppState.sharedBuilds = builds
        // console.log(response)
    }

    async reviewMath(pcId, buildData){
        // console.log(buildData, 'pls')
        let reviewVal = 0
        let review = AppState.reviews
          for(let i = 0; i < AppState.reviews.length; i++){
            reviewVal += review[i].rating
          }
          let average = reviewVal / AppState.reviews.length
          let newVal = Math.round(average * 10) / 10
          buildData.rating = newVal
          await this.updateReview(pcId, buildData)
    }

    
    async updateReview(pcId, buildData){
        let response = await api.put(`api/builds/rating/${pcId}`, buildData)
        let updatedList = new PcList(response.data)
        // console.log(pcId, 'new rating?')
        AppState.sharedBuilds = AppState.sharedBuilds.map(build => build.id !== pcId ? build : updatedList)
    }
}


export const pcService = new PcService()