import { Schema } from "mongoose";




export const BuildPartSchema = new Schema({
    pcId: {type: Schema.Types.ObjectId,ref: 'PcBuild', required: true},
    accountId: {type: Schema.Types.ObjectId, ref: 'Account'},
    partId: {type: Schema.Types.ObjectId, ref: 'StockPart', required: true},
}, {toJSON: {virtuals: true}})

BuildPartSchema.virtual('creator', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

BuildPartSchema.virtual('computer', {
    localField: 'pcId',
    foreignField: '_id',
    ref: 'PcBuild',
    justOne: true
})

BuildPartSchema.virtual('part', {
    localField: 'partId',
    foreignField: '_id',
    ref: 'StockPart',
    justOne: true
})
