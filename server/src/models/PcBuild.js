import { Schema } from "mongoose";



export const PcBuildSchema = new Schema({
    creatorId: {type: Schema.Types.ObjectId, required: true},
    price: {type: Number, maxLength: 5, default: 0},
    name: {type: String, required: true, maxLength: 20},
    powerScore: {type: Number, maxLength: 15, default: 0},
    rating: {type: String, enum:['1','2','3','4','5','0'], default: '0'},
    isShared: {type: Boolean, default: false}
}, {toJSON: {virtuals: true}})

PcBuildSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

 