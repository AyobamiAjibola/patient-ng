import UserController from "../controller/UserController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";
import { Request, Response } from "express";

const userController = new UserController();

export const getAllUserHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.getAllUsers(req);

    res.status(response.code).json(response);
});

export const getSingleUserHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.getSingleUser(req);

    res.status(response.code).json(response);
});

export const updateUserOnboardingHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.updateUserOnboarding(req);

    res.status(response.code).json(response);
});

export const updateUserProfileHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.updateUserProfile(req);

    res.status(response.code).json(response);
});

export const deactivateUserHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.deactivateUser(req);

    res.status(response.code).json(response);
});

//Award
export const createAwardHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.createAward(req);

    res.status(response.code).json(response);
});

export const updateAwardHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.updateAward(req);

    res.status(response.code).json(response);
});

export const getSingleAwardHandler = async (req: Request, res: Response) =>  {
    const response = await userController.getSingleAward(req);

    res.status(response.code).json(response);
};

export const getAwardsHandler = async (req: Request, res: Response) =>  {
    const response = await userController.getAllAwards(req);

    res.status(response.code).json(response);
};

export const deleteAwardHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.deleteAward(req);

    res.status(response.code).json(response);
});


//advocacy
export const getUserAdvocaciesHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.getUserAdvocacies(req);

    res.status(response.code).json(response);
});

export const getSingleAdvocateHandler = async (req: Request, res: Response) =>  {
    const response = await userController.getSingleAdvocate(req);

    res.status(response.code).json(response);
};

export const deleteAdvocacyHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.deleteAdvocacy(req);

    res.status(response.code).json(response);
});

export const getAllAdvocaciesHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.getAllAdvocacies(req);

    res.status(response.code).json(response);
});

export const createAdvocacyHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.createAdvocacy(req);

    res.status(response.code).json(response);
});

export const updateAdvocacyHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.updateAdvocacy(req);

    res.status(response.code).json(response);
});

export const updateAdvocacyStatusHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.updateAdvocacyStatus(req);

    res.status(response.code).json(response);
});

//insight
export const getUserInsightsHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.getUserInsights(req);

    res.status(response.code).json(response);
});

export const getSingleInsightHandler = async (req: Request, res: Response) =>  {
    const response = await userController.getSingleInsight(req);

    res.status(response.code).json(response);
};

export const deleteInsightHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.deleteInsight(req);

    res.status(response.code).json(response);
});

export const getAllInsightsHandler = async (req: Request, res:Response) =>  {
    const response = await userController.getAllInsights(req);

    res.status(response.code).json(response);
};

export const createInsightHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.createInsight(req);

    res.status(response.code).json(response);
});

export const updateInsightHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.updateInsight(req);

    res.status(response.code).json(response);
});

export const reviewOnInsightHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.reviewOnInsight(req);

    res.status(response.code).json(response);
});

export const siteVisitCountHandler = async (req: Request, res: Response) =>  {
    const response = await userController.siteVisitCount(req);

    res.status(response.code).json(response);
};

export const dashboardDataUsersGraphHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.dashboardDataUsersGraph(req);

    res.status(response.code).json(response);
});

export const dashboardDataHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.dashboardData(req);

    res.status(response.code).json(response);
});
