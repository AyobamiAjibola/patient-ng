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
    user: mongoose.Types.ObjectId,
    duration: string,
    status: string,
    releaseDate: Date
}

const podcastSchema = new Schema<IPodcast>({
    title: { type: String },
    producedBy: { type: String },
    summary: { type: String },
    status: { type: String },
    channels: [
        {
            source: { type: String },
            link: { type: String }
        }
    ],
    image: { type: String },
    category: { type: String },
    duration: { type: String },
    releaseDate: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export interface IPodcastModel extends Document, IPodcast {}

const Podcast = mongoose.model<IPodcastModel>('Podcast', podcastSchema as any);

export default Podcast;