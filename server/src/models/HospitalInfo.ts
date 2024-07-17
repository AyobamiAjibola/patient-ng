import mongoose, { Document, Schema } from 'mongoose';

interface IHospitalInfo {
    hospitalName: string;
    address: string;
    email: string;
    phone: string;
    image: string;
    services: string[];
    website: string;
    rating: number;
    state: string;
    lga: string;
};

const hospitalInfoSchema = new Schema<IHospitalInfo>({
    hospitalName: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
    services: [{ type: String }],
    website: { type: String },
    rating: { type: Number, default: 0 },
    state: { type: String },
    lga: { type: String }
}, { timestamps: true });
  
export interface IHospitalInfoModel extends Document, IHospitalInfo {}
  
const HospitalInfo: any = mongoose.model<IHospitalInfoModel>('HospitalInfo', hospitalInfoSchema as any);

export default HospitalInfo