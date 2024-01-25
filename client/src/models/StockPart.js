
export class StockPart {
    constructor(data) {
        this.productImage = data.productImage
        this.type = data.type
        this.size = data.size
        this.chipSet = data.chipSet
        this.price = data.price
        this.name = data.name
        this.company = data.company
        this.speed = data.speed
        this.gigs = data.gigs
        this.powerScore = data.powerScore
    }
}