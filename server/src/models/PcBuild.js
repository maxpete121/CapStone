import { Schema } from "mongoose";



export const PcBuildSchema = new Schema({
    creatorId: {type: Schema.Types.ObjectId, required: true},
    price: {type: Number, required: true, maxLength: 5},
    powerScore: {type: Number, required: true, maxLength: 15},
    isSaved: {type: Boolean, required: true, default: false},
    likeIds: {type: Array},
    likes: {type: Number, required: true, default: 0},
    isLiked: {type: Boolean, required: true, default: false},
}, {toJSON: {virtuals: true}})

PcBuildSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

 