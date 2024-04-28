import mongoose, { Document, Schema } from 'mongoose';

interface IPodcastCategory {
    name: string
}

const podcastCategorySchema = new Schema<IPodcastCategory>({
    name: { type: String }
});

export interface IPodcastCategoryModel extends Document, IPodcastCategory {}

const PodcastCategory = mongoose.model<IPodcastCategoryModel>('PodcastCategory', podcastCategorySchema as any);

export default PodcastCategory;