import { Schema } from "mongoose";




export const CartSchema = new Schema({
    accountId: {type: Schema.Types.ObjectId, ref: 'Account'},
    pcId: {type: Schema.Types.ObjectId, required: true, ref: 'PcBuild'},
}, {toJSON: {virtuals: true}})

CartSchema.virtual('pc', {
    localField: 'pcId',
    foreignField: '_id',
    ref: 'PcBuild',
    justOne: true
})

CartSchema.virtual('account', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})
