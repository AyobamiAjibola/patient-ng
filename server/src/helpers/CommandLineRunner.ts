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
import BankRepository from '../repository/BankRepository';
import Bank from '../models/Bank';
import axiosClient from '../services/api/axiosClient';
import IPayStackBank = appModelTypes.IPayStackBank;

export default class CommandLineRunner {
  public static singleton: CommandLineRunner = new CommandLineRunner();
  private userRepository: AbstractCrudRepository;
  private bankRepository: BankRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.bankRepository = new BankRepository();
  }

  public static async run() {
    await this.singleton.loadDefaultUser();
    await this.singleton.loadPayStackBanks();
  }

  async createUploadDirectory() {
    const dirExist = await Generic.fileExist(UPLOAD_BASE_PATH);
    if (!dirExist) await fs.mkdir(UPLOAD_BASE_PATH);
  }

  async loadPayStackBanks() {
    await Bank.collection.drop();

    axiosClient.defaults.baseURL = `${process.env.PAYMENT_GW_BASE_URL}`;
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${process.env.PAYMENT_GW_SECRET_KEY}`;

    const response = await axiosClient.get('/bank');

    const banks = response.data.data as IPayStackBank[];

    const bankValues = banks.map(bank => ({
      name: bank.name,
      slug: bank.slug,
      code: bank.code,
      longCode: bank.longcode,
      gateway: bank.gateway,
      payWithBank: bank.pay_with_bank,
      active: bank.active,
      country: bank.country,
      currency: bank.currency,
      type: bank.type,
      isDeleted: bank.is_deleted,
    }));

    await this.bankRepository.bulkCreate(bankValues as any);
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
