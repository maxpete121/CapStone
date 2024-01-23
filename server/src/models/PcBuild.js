import { Schema } from "mongoose";



export const PcBuildSchema = new Schema({
    creatorId: {type: Schema.Types.ObjectId, required: true},
    price: {type: Number, required: true, maxLength: 5},
    powerScore: {type: Number, required: true, maxLength: 15},
    rating: {type: String, enum:['1','2','3','4','5','0'], required: true},
    pcId: {}
}, {toJSON: {virtuals: true}})

PcBuildSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

 