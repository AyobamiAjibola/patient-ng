import WebinarController from "../controller/WebinarController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";
import { Request, Response } from "express";

const webinarController = new WebinarController();

export const createWebinarCategoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await webinarController.createWebinarCategory(req);

    res.status(response.code).json(response);
});

export const deleteWebinarCategoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await webinarController.deleteWebinarCategory(req);

    res.status(response.code).json(response);
});

export const fetchWebinarCategoriesHandler = async (req: Request, res: Response) =>  {
    const response = await webinarController.fetchWebinarCategories();

    res.status(response.code).json(response);
};

export const createWebinarHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await webinarController.createWebinar(req);

    res.status(response.code).json(response);
});

export const updateWebinarHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await webinarController.updateWebinar(req);

    res.status(response.code).json(response);
});

export const webinarsHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await webinarController.webinars(req);

    res.status(response.code).json(response);
});

export const fetchUsersWebinarsHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await webinarController.fetchUsersWebinars(req);

    res.status(response.code).json(response);
});

export const singleWebinarHandler = async (req: Request, res: Response) =>  {
    const response = await webinarController.singleWebinar(req);

    res.status(response.code).json(response);
};

export const deleteWebinarHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await webinarController.deleteWebinar(req);

    res.status(response.code).json(response);
});

export const createWebinarWaitlistHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await webinarController.createWebinarWaitlist(req);

    res.status(response.code).json(response);
});

export const webinarWaitlistHandler = async (req: Request, res: Response) =>  {
    const response = await webinarController.webinarWaitlist(req);

    res.status(response.code).json(response);
};

export const deleteWebinarWaitlistHandler = authenticateRouteWrapper(async (req: Request, res: Response) =>  {
    const response = await webinarController.deleteWebinarWaitlist(req);

    res.status(response.code).json(response);
});