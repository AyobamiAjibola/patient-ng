import PatientStoriesController from "../controller/PatientStoriesController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";
import { Request, Response } from "express";

const patientStoriesController = new PatientStoriesController();

export const createStoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await patientStoriesController.createStory(req);

    res.status(response.code).json(response);
});

export const updateStoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await patientStoriesController.updateStory(req);

    res.status(response.code).json(response);
});

export const singleStoryHandler = async (req: Request, res: Response) =>  {
    const response = await patientStoriesController.singleStory(req);

    res.status(response.code).json(response);
};

export const storiesHandler = async (req: Request, res: Response) =>  {
    const response = await patientStoriesController.stories(req);

    res.status(response.code).json(response);
};

export const userStoriesHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await patientStoriesController.fetchUserStories(req);

    res.status(response.code).json(response);
});

export const deleteStoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await patientStoriesController.deleteStory(req);

    res.status(response.code).json(response);
});

export const publishStoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await patientStoriesController.publishStory(req);

    res.status(response.code).json(response);
});

export const rejectStoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await patientStoriesController.rejectStory(req);

    res.status(response.code).json(response);
});