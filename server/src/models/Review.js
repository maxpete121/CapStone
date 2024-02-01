import { Schema } from "mongoose";

export const ReviewSchema = new Schema({
    body: { type: String, required: true, maxLength: 500 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    pcId: { type: Schema.Types.ObjectId, required: true, ref: 'PcBuild'},
    rating: { type: Number, maxLength: 1 }
},
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)
ReviewSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true,
})

ReviewSchema.virtual('pc', {
    localField: 'pcId',
    foreignField: '_id',
    ref: 'PcBuild',
    justOne: true,
})

