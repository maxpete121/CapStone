import { Schema } from "mongoose";



export const PcBuildSchema = new Schema({
    creatorId: {type: Schema.Types.ObjectId, required: true},
    price: {type: Number, maxLength: 5, default: 0},
    name: {type: String, required: true, maxLength: 20},
    powerScore: {type: Number, maxLength: 15, default: 0},
    rating: {type: Number, default: 0, maxLength: 1},
    isShared: {type: Boolean, default: false},
}, {toJSON: {virtuals: true}, timestamps: true}, )

PcBuildSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})
