import { Schema } from "mongoose";



export const PcBuildSchema = new Schema({
    creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
    price: {type: Number, maxLength: 5, default: 0},
    name: {type: String, required: true, maxLength: 20},
    powerScore: {type: Number, maxLength: 15, default: 0},
    rating: {type: String, default: 0},
    isShared: {type: Boolean, default: false},
}, {toJSON: {virtuals: true}, timestamps: true}, )

PcBuildSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})
