import { Schema } from "mongoose";





export const StockPartSchema = new Schema({
    productImage: {type: String, maxLength: 500, required: true},
    type: {type: String, enum: ['cpu','gpu','motherboard','ram', 'storage', 'cpuCooler', 'powerSupply', 'case', 'caseFan' ], required: true},
    size: {type: String, enum: ['atx', 'micro-atx', 'itx', 'none'], required: true},
    chipSet: {type: String, enum:['AM5', '14th Gen']},
    price: {type: Number, required: true, minLength: 2},
    name: {type: String, required: true, maxLength: 50, minLength: 4},
    company: {type: String, required: true, maxLength: 15},
    speed: {type: String, maxLength: 10},
    gigs: {type: String, maxLength: 15},
    powerScore: {type: Number, maxLength: 7, minLength: 1, required: true}
})