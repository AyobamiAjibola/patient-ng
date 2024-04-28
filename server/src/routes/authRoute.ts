import { Request, Response } from "express";
import AuthenticationController from "../controller/AuthenticationController";
import PasswordEncoder from "../utils/PasswordEncoder";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";

const passwordEncoder = new PasswordEncoder();
const authController = new AuthenticationController(passwordEncoder);

export const sendSignUpOtpHandler = async (req: Request, res: Response) =>  {
    const response = await authController.sendSignUpToken(req);

    res.status(response.code).json(response);
};

export const validateSignUpOtpHandler = async (req: Request, res: Response) =>  {
    const response = await authController.validateSignUpToken(req);

    res.status(response.code).json(response);
};

export const signUpHandler = async (req: Request, res: Response) =>  {
    const response = await authController.signUpUser(req);

    res.status(response.code).json(response);
};

export const signInHandler = async (req: Request, res: Response) =>  {
    const response = await authController.signInUser(req);

    res.status(response.code).json(response);
};

export const signInAdminUserHandler = async (req: Request, res: Response) =>  {
    const response = await authController.signInAdminUser(req);

    res.status(response.code).json(response);
};

export const changePasswordHandler = async (req: Request, res: Response) =>  {
    const response = await authController.changePassword(req);

    res.status(response.code).json(response);
};

export const getAccessTokenHandler = async (req: Request, res: Response) =>  {
    const response = await authController.getAccessToken(req);

    res.status(response.code).json(response);
};

export const sendPasswordResetLinkHandler = async (req: Request, res: Response) =>  {
    const response = await authController.sendPasswordResetLink(req);

    res.status(response.code).json(response);
};

export const resetPasswordHandler = async (req: Request, res: Response) =>  {
    const response = await authController.resetPassword(req);

    res.status(response.code).json(response);
};

export const createUserHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await authController.createUser(req);

    res.status(response.code).json(response);
});