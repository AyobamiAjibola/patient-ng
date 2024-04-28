import mongoose, { Document, Schema } from 'mongoose';

interface IBlog {
    title: string,
    body: string,
    category: string | null,
    comments: mongoose.Types.ObjectId[];
    likes: mongoose.Types.ObjectId[];
    hot: boolean;
    titleImage: string;
    bodyImage: string;
    publisher: string;
    user: mongoose.Types.ObjectId;
}

const blogSchema = new Schema<IBlog>({
    title: { type: String },
    body: { type: String },
    category: { type: String, allowNull: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'BlogComments' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    hot: { type: Boolean, default: false },
    titleImage: { type: String },
    bodyImage: { type: String },
    publisher: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export interface IBlogModel extends Document, IBlog {}

const Blog = mongoose.model<IBlogModel>('Blog', blogSchema as any);

export default Blog;