import { Request, Response } from "express";
import TransactionController from "../controller/TransactionController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";

const transactionController = new TransactionController();

export const donateyHandler = async (req: Request, res: Response) =>  {
    const response = await transactionController.donate(req);

    res.status(response.code).json(response);
};

export const initTransactionCallbackHandler = async (req: Request, res: Response) =>  {
    const response = await transactionController.initTransactionCallback(req);

    res.status(response.code).json(response);
};

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
    const response = await transactionController.getBanks(req);

    res.status(response.code).json(response);
};

export const verifyBankHandler = async (req: Request, res: Response) =>  {
    const response = await transactionController.verifyBank(req);

    res.status(response.code).json(response);
};