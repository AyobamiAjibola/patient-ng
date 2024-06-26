import CrowdFundingController from "../controller/CrowdFundingController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";
import { Request, Response } from "express";

const crowdFundingController = new CrowdFundingController();

export const activateCrowdFundingHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await crowdFundingController.activateCrowdFunding(req);

    res.status(response.code).json(response);
});

export const markCrowdFundingDoneHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await crowdFundingController.markCrowdFundingDone(req);

    res.status(response.code).json(response);
});

export const getActiveCrowdfundingHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await crowdFundingController.getActiveCrowdfunding(req);

    res.status(response.code).json(response);
});

export const fetchUsersCrowdFundingHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await crowdFundingController.fetchUsersCrowdFunding(req);

    res.status(response.code).json(response);
});

export const createCrowdFundingHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await crowdFundingController.createCrowdFunding(req);

    res.status(response.code).json(response);
});

export const updateCrowdFundingHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await crowdFundingController.updateCrowdFunding(req);

    res.status(response.code).json(response);
});

export const crowdFundingsHandler = async (req: Request, res: Response) =>  {
    const response = await crowdFundingController.crowdFundings(req);

    res.status(response.code).json(response);
};

export const singleCrowdFundingHandler = async (req: Request, res: Response) =>  {
    const response = await crowdFundingController.singleCrowdFunding(req);

    res.status(response.code).json(response);
};

export const deleteCrowdFundingHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await crowdFundingController.deleteCrowdFunding(req);

    res.status(response.code).json(response);
});

export const softDeleteCrowdFundingHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await crowdFundingController.softDeleteCrowdFunding(req);

    res.status(response.code).json(response);
});

export const likeCrowdFundingHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await crowdFundingController.likeCrowdFunding(req);

    res.status(response.code).json(response);
});