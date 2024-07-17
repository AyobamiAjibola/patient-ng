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

// export const createInsightHandler = authenticateRouteWrapper(async (req, res) =>  {
//     const response = await userController.createInsight(req);

//     res.status(response.code).json(response);
// });

// export const updateInsightHandler = authenticateRouteWrapper(async (req, res) =>  {
//     const response = await userController.updateInsight(req);

//     res.status(response.code).json(response);
// });

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

export const postHospitalHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.postHospital(req);

    res.status(response.code).json(response);
});

export const postTAndCHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.postTAndC(req);

    res.status(response.code).json(response);
});

export const aboutAndContactUsHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.aboutAndContactUs(req);

    res.status(response.code).json(response);
});

export const getHospitalsHandler = async (req: Request, res: Response) =>  {
    const response = await userController.getHospitals(req);

    res.status(response.code).json(response);
};

export const getDocsHandler = async (req: Request, res: Response) =>  {
    const response = await userController.getDocs(req);

    res.status(response.code).json(response);
};

export const deleteHospitalHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.deleteHospital(req);

    res.status(response.code).json(response);
});

export const uploadMenuFileHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.uploadFile(req);

    res.status(response.code).json(response);
});

export const fetchFilesHandler = async (req: Request, res: Response) =>  {
    const response = await userController.fetchFiles(req);

    res.status(response.code).json(response);
};

export const deleteFileHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await userController.deleteFile(req);

    res.status(response.code).json(response);
});

export const getInsightRatingsHandler = async (req: Request, res: Response) =>  {
    const response = await userController.getInsightRatings(req);

    res.status(response.code).json(response);
};

export const getAllReviewsHandler = async (req: Request, res: Response) =>  {
    const response = await userController.getAllReviews(req);

    res.status(response.code).json(response);
};

export const getSingleReviewHandler = async (req: Request, res: Response) =>  {
    const response = await userController.getSingleReview(req);

    res.status(response.code).json(response);
};

export const changeReviewStatusHandler = async (req: Request, res: Response) =>  {
    const response = await userController.changeReviewStatus(req);

    res.status(response.code).json(response);
};
