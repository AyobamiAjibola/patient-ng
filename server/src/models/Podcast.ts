import mongoose, { Document, Schema } from 'mongoose';

interface IPodcast {
    title: string,
    producedBy: string,
    summary: string,
    channels: {
        source: string,
        link: string
    },
    image: string,
    category: string,
    user: mongoose.Types.ObjectId
}

const podcastSchema = new Schema<IPodcast>({
    title: { type: String },
    producedBy: { type: String },
    summary: { type: String },
    channels: [
        {
            source: { type: String },
            link: { type: String }
        }
    ],
    image: { type: String },
    category: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export interface IPodcastModel extends Document, IPodcast {}

const Podcast = mongoose.model<IPodcastModel>('Podcast', podcastSchema as any);

export default Podcast;