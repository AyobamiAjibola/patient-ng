import UserController from "../controller/UserController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";

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