import mongoose, { Document, Schema } from 'mongoose';

interface IBlog {
    title: string,
    content: string,
    category: mongoose.Types.ObjectId,
    comments: mongoose.Types.ObjectId[];
    likes: mongoose.Types.ObjectId[];
    hot: string;
    titleImage: string;
    bodyImage: string;
    publisher: string;
    user: mongoose.Types.ObjectId;
    urlSlug: string;
    status: string;
}

const blogSchema = new Schema<IBlog>({
    title: { type: String },
    content: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'BlogCategory' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'BlogComments' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    hot: { type: String, default: "false" },
    titleImage: { type: String },
    bodyImage: { type: String },
    publisher: { type: String },
    urlSlug: { type: String },
    status: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

blogSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'user',
        select: '_id firstName lastName image email'
      });
    next();
});

blogSchema.pre(['findOne', 'find'], function (next) {
    this.populate({
        path: 'category',
        select: '_id name'
      });
    next();
});

export interface IBlogModel extends Document, IBlog {}

const Blog = mongoose.model<IBlogModel>('Blog', blogSchema as any);

export default Blog;