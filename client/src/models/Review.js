export class Review {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.rating = data.rating
        this.pcId = data.pcId
        this.pc = data.pc
    }
}