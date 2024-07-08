/**
 * This helper Class, executes commands in form of methods,we want to run at runtime.
 */

import fs from 'fs/promises';
import Generic from '../utils/Generic';
import { UPLOAD_BASE_PATH } from '../config/constants';
import { appModelTypes } from '../@types/app-model';
import AbstractCrudRepository = appModelTypes.AbstractCrudRepository;
import UserRepository from '../repository/UserRepository';
import admin from '../resources/data/admin.json';
import { IUserModel } from '../models/User';
import PatientDocsRepository from '../repository/PatientDocsRepository';
import { IPatientDocsModel } from '../models/PatientDocs';

export default class CommandLineRunner {
  public static singleton: CommandLineRunner = new CommandLineRunner();
  private userRepository: AbstractCrudRepository;
  private patientDocsRepository: PatientDocsRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.patientDocsRepository = new PatientDocsRepository();
  }

  public static async run() {
    await this.singleton.loadDefaultUser();
    await this.singleton.loadDefaultPatientDocs();
  }

  async createUploadDirectory() {
    const dirExist = await Generic.fileExist(UPLOAD_BASE_PATH);
    if (!dirExist) await fs.mkdir(UPLOAD_BASE_PATH);
  }

  async loadDefaultPatientDocs() {
    const patientDocs = await this.patientDocsRepository.findOne({});

    if(!patientDocs) {
      await this.patientDocsRepository.save({
        termsAndCondition: {
          content: '',
          dateUpdated: new Date()
        },
        aboutUs: '',
        contactUs: ''
      } as IPatientDocsModel)
    }
  }

  async loadDefaultUser() {
    const adminUser = await this.userRepository.findOne({ email: admin.email });
    
    if(!adminUser) {
      await this.userRepository.save({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        phone: admin.phone,
        password: admin.password,
        isAdmin: admin.isAdmin,
        userType: admin.userType
      } as IUserModel)
    };
  }

}
