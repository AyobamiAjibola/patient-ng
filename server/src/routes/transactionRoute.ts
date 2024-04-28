import { Request, Response } from "express";
import TransactionController from "../controller/TransactionController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";
import BankController from "../controller/BankController";

const transactionController = new TransactionController();
const bankController = new BankController();

export const donateyHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await transactionController.donate(req);

    res.status(response.code).json(response);
});

export const initTransactionCallbackHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await transactionController.initTransactionCallback(req);

    res.status(response.code).json(response);
});

export const fetchPaymentRequestHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await transactionController.fetchPaymentRequest(req);

    res.status(response.code).json(response);
});

export const requestPaymentHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await transactionController.requestPayment(req);

    res.status(response.code).json(response);
});

export const makePaymentHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await transactionController.makePayment(req);

    res.status(response.code).json(response);
});

export const getBanksHandler = async (req: Request, res: Response) =>  {
    const response = await bankController.getBanks(req);

    res.status(response.code).json(response);
};