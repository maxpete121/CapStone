import { Schema } from "mongoose";




export const BuildPartSchema = new Schema({
    pcId: {type: Schema.Types.ObjectId,ref: 'PcBuild', required: true},
    accountId: {type: Schema.Types.ObjectId, ref: 'Account'},
    partId: {type: Schema.Types.ObjectId, ref: 'StockPart', required: true},
}, {toJSON: {virtuals: true}})
