



export class PcList{
    constructor(data){
        this.creatorId = data.creatorId
        this.name = data.name
        this.price = data.price
        this.powerScore = data.powerScore
        this.rating = data.rating
        this.isShared = data.isShared
        this.creator = data.creator
        this.id = data._id
        this.hasCpu = data.hasCpu
        this.hasGpu = data.hasGpu
        this.hasMotherboard = data.hasMotherboard
        this.hasPowerSupply = data.hasPowerSupply
        this.hasCase = data.hasCase
    }
}