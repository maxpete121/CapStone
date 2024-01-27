import { Schema } from "mongoose";

export const ReviewSchema = new Schema({
    body: { type: String, required: true, maxlength: 500 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
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

