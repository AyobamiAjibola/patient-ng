import { appCommonTypes } from "../@types/app-common";
import HttpResponse = appCommonTypes.HttpResponse;
import HttpStatus from "../helpers/HttpStatus";
import datasources from '../services/dao';
import { Request } from "express";
import Joi from "joi";
import CustomAPIError from "../exceptions/CustomAPIError";
import { TryCatch } from "../decorators";
import { ITransactionModel } from "../models/Transaction";
import axiosClient from '../services/api/axiosClient';
import PaystackService from "../services/PaystackService";
import { PAYMENT_CHANNELS } from "../config/constants";
import Generic from "../utils/Generic";
import { IPaymentRequestModel } from "../models/PaymentRequest";
import SendMailService from "../services/SendMailService";
import mail_template from "../resources/template/email/password";
import { IBankModel } from "../models/Bank";

const paystackService = new PaystackService();
const sendMailService = new SendMailService();

export default class TransactionController {
    @TryCatch
    public async donate(req: Request) {

        const userId = req.user._id

        const { error, value } = Joi.object<any>({
            amount: Joi.number().required().label('Amount'),
            crowedFundingId: Joi.string().required().label("Crowed funding id is required.")
        }).validate(req.body);
      
        if (error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
        if (!value)
            return Promise.reject(CustomAPIError.response(HttpStatus.BAD_REQUEST.value, HttpStatus.BAD_REQUEST.code));

        const [user, crowdFunding] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.crowdFundingDAOService.findById(value.crowedFundingId),
        ]);

        if(!crowdFunding)
            return Promise.reject(CustomAPIError.response("Crowed funding not found.", HttpStatus.NOT_FOUND.code));
        if(!user)
            return Promise.reject(CustomAPIError.response('User does not exist', HttpStatus.NOT_FOUND.code));

        const crowedFunding = await datasources.crowdFundingDAOService.findByAny({ user: crowdFunding.user });
        if(!crowedFunding)
            return Promise.reject(CustomAPIError.response('Crowed funding user does not exist', HttpStatus.NOT_FOUND.code));

        //initialize payment
        const metadata = {
            cancel_action: `${process.env.PAYMENT_GW_CB_URL}/transactions?status=cancelled`,
        };

        axiosClient.defaults.baseURL = `${process.env.PAYMENT_GW_BASE_URL}`;
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${process.env.PAYMENT_GW_SECRET_KEY}`;
    
        let endpoint = '/balance';

        const balanceResponse = await axiosClient.get(endpoint);
        if (balanceResponse.data.data.balance === 0)
        return Promise.reject(
            CustomAPIError.response('Insufficient Balance. Please contact support.', HttpStatus.BAD_REQUEST.code),
        );

        endpoint = '/transaction/initialize';

        const callbackUrl = `${process.env.PAYMENT_GW_CB_URL}/`;
        const amount = value.amount;
        let serviceCharge = 0.015 * amount;

        if (amount >= 2500) {
            serviceCharge = 0.015 * amount + 100;
        }

        if (serviceCharge >= 2000) serviceCharge = 2000;

        const _amount = Math.round((serviceCharge + amount) * 100);

        const initResponse = await axiosClient.post(`${endpoint}`, {
            email: user.email,
            amount: _amount,
            callback_url: callbackUrl,
            metadata,
            channels: PAYMENT_CHANNELS,
        });

        const data = initResponse.data.data;
 
        const txnValues: Partial<ITransactionModel> = {
            reference: data.reference,
            authorizationUrl: data.authorization_url,
            type: 'Payment',
            status: initResponse.data.message,
            amount: value.amount,
            user: user._id,
            crowedFunding: crowedFunding._id
        };

        const transaction = await datasources.transactionDAOService.create(txnValues as ITransactionModel);

        const response: HttpResponse<ITransactionModel> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
            result: transaction,
          };
      
        return Promise.resolve(response);

    };

    @TryCatch
    public async getBanks(req: Request) {

        axiosClient.defaults.baseURL = `${process.env.PAYMENT_GW_BASE_URL}`;
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${process.env.PAYMENT_GW_SECRET_KEY}`;

        const banks = await axiosClient.get('/bank');

        const response: HttpResponse<IBankModel> = {
            code: HttpStatus.OK.code,
            message: 'Banks retrived successfully.',
            results: banks.data.data,
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async verifyBank(req: Request) {

        const { error, value } = Joi.object<any>({
            accountNumber: Joi.string().required().label('account number'),
            bankCode: Joi.string().required().label("bank code")
        }).validate(req.body);
console.log(value.accountNumber, value.bankCode, 'dfd')
        const verificationData = await paystackService.verifyBankAccount(value.accountNumber, value.bankCode);

        if (!verificationData) {
            return Promise.reject(
            CustomAPIError.response(
                "Account number provided is invalid.",
                HttpStatus.BAD_REQUEST.code
            )
            );
        }

        const response: HttpResponse<IBankModel> = {
            code: HttpStatus.OK.code,
            message: 'Successfull.',
            result: verificationData.data.account_name
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async initTransactionCallback(req: Request) {
        // const { reference } = req.query as unknown as { reference: string };

        const { error, value } = Joi.object<any>({
            reference: Joi.string().required().label('reference'),
            // amount: Joi.number().required().label('Amount'),
            crowedFundingId: Joi.string().required().label("Crowed funding id is required.")
        }).validate(req.body);

        const transaction = await datasources.transactionDAOService.findByAny({
           reference: value.reference
        });
        
        if (!transaction) {
            return Promise.reject(CustomAPIError.response('Transaction Does not exist.', HttpStatus.NOT_FOUND.code));
        }

        const crowedFunding = await datasources.crowdFundingDAOService.findById(value.crowedFundingId);
        if(!crowedFunding)
            return Promise.reject(CustomAPIError.response("Crowed funding not found.", HttpStatus.NOT_FOUND.code));

        //verify payment
        axiosClient.defaults.baseURL = `${process.env.PAYMENT_GW_BASE_URL}`;
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${process.env.PAYMENT_GW_SECRET_KEY}`;

        const endpoint = `/transaction/verify/${value.reference}`;

        const axiosResponse = await axiosClient.get(endpoint);

        const data = axiosResponse.data.data;
        
        // const amountInKobo = data.amount * 100;
        // await paystackService.sendMoneyToAccount(crowedFunding.account.accountNumber, crowedFunding.account.bankCode, amountInKobo, "Payment");
        
        const $transaction = {
            reference: data.reference,
            channel: data.authorization.channel,
            cardType: data.authorization.card_type,
            bank: data.authorization.bank,
            last4: data.authorization.last4,
            expMonth: data.authorization.exp_month,
            expYear: data.authorization.exp_year,
            countryCode: data.authorization.country_code,
            brand: data.authorization.brand,
            currency: data.currency,
            status: data.status,
            paidAt: data.paid_at,
            type: transaction.type,
        };

        await datasources.transactionDAOService.update(
            {_id: transaction._id},
            $transaction
        );

        const payload = {
            user: transaction.user,
            amount: transaction.amount,
            date: data.paid_at
        };

        const donations = [...crowedFunding.donations, payload];
        const amountPaid = +crowedFunding.amountRaised + +value.amount

        await datasources.crowdFundingDAOService.updateByAny(
            { _id: crowedFunding._id },
            {
                donations,
                amountRaised: amountPaid.toString()
            }
        );

        const response: HttpResponse<void> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
        };

        return Promise.resolve(response);
    };

    @TryCatch
    public async fetchPaymentRequest(req: Request) {

        const userId = req.user._id;

        const [user] = await Promise.all([
            datasources.userDAOService.findById(userId)
        ]);

        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const paymentReq = await datasources.paymentRequestDAOService.findAll({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
            results: paymentReq
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async requestPayment(req: Request) {

        const crowedFundingId = req.params.crowedFundingId;
        const userId = req.user._id;
        const user = await datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found", HttpStatus.NOT_FOUND.code));

        const crowedFunding = await datasources.crowdFundingDAOService.findById(crowedFundingId);
        if(!crowedFunding)
            return Promise.reject(CustomAPIError.response("CrowedFunding not found", HttpStatus.NOT_FOUND.code));

        const allwedWithdrawal = +crowedFunding.amountNeeded / 50 * 100

        if(+crowedFunding.amountRaised < allwedWithdrawal)
            return Promise.reject(CustomAPIError.response("You can not request for withdrawal, the amount raised is less than 50% of amount needed.", HttpStatus.NOT_FOUND.code));
        
        
        const paymentReq = await datasources.paymentRequestDAOService.findByAny(
            { crowedFunding: crowedFunding._id }
        );

        if(paymentReq && paymentReq?.status === "pending")
            return Promise.reject(CustomAPIError.response("You have a pending payment request.", HttpStatus.NOT_FOUND.code));

        const payload: Partial<IPaymentRequestModel> = {
            crowedFunding: crowedFunding._id,
            amountRequested: +crowedFunding.amountRaised,
            status: "pending",
            refNumber: Generic.generateRandomString(6)
        }

        const payment = await datasources.paymentRequestDAOService.create(payload as IPaymentRequestModel);

        const amountWithdrawn = crowedFunding.amountWithdrawn + payment.amountRequested
        await datasources.crowdFundingDAOService.update(
            { crowedFunding: crowedFunding._id },
            { 
                amountWithdrawn: amountWithdrawn,
                status: +crowedFunding.amountNeeded > amountWithdrawn 
                            ? 'in-progress' 
                            : +crowedFunding.amountNeeded === amountWithdrawn && 'done'
            }
        )
    
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: "Payment request was successful"
        };

        return Promise.resolve(response);
    }

    public async makePayment(req: Request) {
        const loggedInUserId = req.user._id;
        const crowedFundingId = req.params.crowedFundingId;
    
        try {
            const [loggedInUser, crowdFunding] = await Promise.all([
                datasources.userDAOService.findById(loggedInUserId),
                datasources.crowdFundingDAOService.findById(crowedFundingId)
            ]);
    
            if (loggedInUser && !loggedInUser.isAdmin) {
                return Promise.reject(
                    CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code)
                );
            }
    
            if (!crowdFunding) {
                return Promise.reject(CustomAPIError.response("Crowdfunding not found", HttpStatus.NOT_FOUND.code));
            }
    
            const user = await datasources.userDAOService.findById(crowdFunding.user);
    
            const paymentReq = await datasources.paymentRequestDAOService.findByAny({
                crowedFunding: crowdFunding._id,
                status: "pending",
            });
    
            if (!paymentReq) {
                return Promise.reject(CustomAPIError.response("Payment request not found", HttpStatus.NOT_FOUND.code));
            }
    
            const amountInKobo = paymentReq.amountRequested * 100;
            await paystackService.sendMoneyToAccount(crowdFunding.account.accountNumber, crowdFunding.account.bankCode, amountInKobo, "Payment");
    
            await datasources.paymentRequestDAOService.updateByAny(
                { _id: paymentReq._id },
                { status: "paid" }
            );
    
            //SEND OTP TO USER EMAIL
            const mail = mail_template({
                message: `NGN${paymentReq.amountRequested} has been sent to your account.`
            });
    
            await sendMailService.sendMail({
                to: user?.email,
                replyTo: process.env.SMTP_EMAIL_FROM,
                from: {
                    name: 'iPatient',
                    address: process.env.SMTP_EMAIL_FROM || '',
                },
                subject: `iPatient has sent you money.`,
                html: mail,
                bcc: [process.env.SMTP_BCC || '']
            });
    
            const response: HttpResponse<any> = {
                code: HttpStatus.OK.code,
                message: "Payment sent."
            };
    
            return Promise.resolve(response);
        } catch (error: any) {
            return Promise.reject(CustomAPIError.response(error.message, HttpStatus.INTERNAL_SERVER_ERROR.code));
        }
    }
}