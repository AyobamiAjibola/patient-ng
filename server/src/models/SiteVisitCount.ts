import mongoose, { Document, Schema } from 'mongoose';

interface ISiteVisitCounts {
  count: number,
  dateTime: Date
}

interface ISiteVisitCount {
    viewCount?: number,
    viewCounts?: ISiteVisitCounts[]
}

const siteSiteVisitCountSchema = new Schema<ISiteVisitCount>({
    viewCount: { type: Number, default: 0 },
    viewCounts: [
      {
        count: { type: Number, default: 0 },
        dateTime: { type: Date, default: Date.now }
      }
    ]
})

export interface ISiteVisitCountModel extends Document, ISiteVisitCount {}

const SiteVisitCount = mongoose.model<ISiteVisitCountModel>('SiteVisitCount', siteSiteVisitCountSchema as any);

export default SiteVisitCount;
  