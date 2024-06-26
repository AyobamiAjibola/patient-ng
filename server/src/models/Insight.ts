import mongoose, { Document, Schema } from 'mongoose';

interface IInsight {
    hospitalName: string;
    hospitalAddress: string;
    state: string;
    image: string;
    rating: number;
    comment: string;
    status: string;
    reviews: {
        review: string;
        user: mongoose.Types.ObjectId;
    }[]
    user: mongoose.Types.ObjectId;
};

const insightSchema = new Schema<IInsight>({
    hospitalName: { type: String },
    hospitalAddress: { type: String },
    state: { type: String },
    status: { type: String, default: 'pending' },
    image: { type: String },
    rating: { type: Number },
    comment: { type: String },
    reviews: [{
        review: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

insightSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'user',
        select: '_id firstName lastName email phone image'
      });
    next();
});

insightSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'reviews.user',
        select: 'firstName lastName image'
      });
    next();
});
  
export interface IInsightModel extends Document, IInsight {}
  
const Insight = mongoose.model<IInsightModel>('Insight', insightSchema as any);

export default Insight