import mongoose, { Document, Schema } from 'mongoose';

interface IHospitalInfo {
    hospitalName: string;
    address: string;
};

const hospitalInfoSchema = new Schema<IHospitalInfo>({
    hospitalName: { type: String },
    address: { type: String },
}, { timestamps: true });
  
export interface IHospitalInfoModel extends Document, IHospitalInfo {}
  
const HospitalInfo = mongoose.model<IHospitalInfoModel>('HospitalInfo', hospitalInfoSchema as any);

export default HospitalInfo