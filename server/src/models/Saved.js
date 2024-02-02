import { Schema } from "mongoose";



export const SavedSchema = new Schema({
    accountId: {type: Schema.Types.ObjectId},
    pcId: {type: Schema.Types.ObjectId, required: true}
}, {toJSON: {virtuals: true}})

SavedSchema.virtual('creator', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

SavedSchema.virtual('pc', {
    localField: 'pcId',
    foreignField: '_id',
    ref: 'PcBuild',
    justOne: true
})