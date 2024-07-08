import mongoose, { Document, Schema } from 'mongoose';

interface IPatientDocs {
    termsAndCondition: {
        content: string,
        dateUpdated: Date
    };
    aboutUs: string;
    contactUs: string;
};

const patientDocsSchema = new Schema<IPatientDocs>({
    termsAndCondition: { 
        content: { type: String },
        dateUpdated: { type: Date }
    },
    aboutUs: { type: String },
    contactUs: { type: String },
}, { timestamps: true });
  
export interface IPatientDocsModel extends Document, IPatientDocs {}
  
const PatientDocs = mongoose.model<IPatientDocsModel>('PatientDocs', patientDocsSchema as any);

export default PatientDocs