import { Schema } from "mongoose";

export const ReviewSchema = new Schema({
    body: { type: String, required: true, maxlength: 500 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    pcId: {type: Schema.Types.ObjectId, required: true},
    rating: {type: Number, maxLength: 1, required: true}
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
