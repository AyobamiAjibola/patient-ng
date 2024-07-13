import mongoose, { Document, Schema } from 'mongoose';

interface IAdvocacyFiles {
    files: {
        _id: string,
        description: string,
        file: string
    }[];
};

const advocacyFilesSchema = new Schema<IAdvocacyFiles>({
    files: [{ description: { type: String }, file: { type: String } }],
}, { timestamps: true });
  
export interface IAdvocacyFilesModel extends Document, IAdvocacyFiles {}
  
const AdvocacyFiles = mongoose.model<IAdvocacyFilesModel>('AdvocacyFiles', advocacyFilesSchema as any);

export default AdvocacyFiles