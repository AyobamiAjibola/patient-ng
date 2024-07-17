import mongoose, { Document, Schema } from 'mongoose';

interface IInsight {
    hospital: mongoose.Types.ObjectId;
    rating: number;
    reviews: {
        review: string;
        status: string;
        rating: number;
        createdAt: Date;
        user: mongoose.Types.ObjectId;
    }[]
};

const insightSchema = new Schema<IInsight>({
    hospital: { type: Schema.Types.ObjectId, ref: 'HospitalInfo' },
    rating: { type: Number },
    reviews: [{
        status: { type: String },
        rating: { type: Number },
        review: { type: String },
        createdAt: { type: Date },
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    }]
}, { timestamps: true });

insightSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'hospital'
      }).populate({
        path: 'reviews.user',
        select: 'firstName lastName image'
      });
    next();
});
  
export interface IInsightModel extends Document, IInsight {}
  
const Insight = mongoose.model<IInsightModel>('Insight', insightSchema as any);

export default Insight