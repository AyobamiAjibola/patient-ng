import PodcastController from "../controller/podcastController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";
import { Request, Response } from "express";

const podcastController = new PodcastController();

export const createPodcastCategoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await podcastController.createPodcastCategory(req);

    res.status(response.code).json(response);
});

export const deletePodcastCategoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await podcastController.deletePodcastCategory(req);

    res.status(response.code).json(response);
});

export const fetchPodcastCategoriesHandler = async (req: Request, res: Response) =>  {
    const response = await podcastController.fetchPodcastCategories();

    res.status(response.code).json(response);
};

export const createPodcastHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await podcastController.createPodcast(req);

    res.status(response.code).json(response);
});

export const updatePodcastHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await podcastController.updatePodcast(req);

    res.status(response.code).json(response);
});

export const podcastsHandler = async (req: Request, res: Response) =>  {
    const response = await podcastController.podcasts(req);

    res.status(response.code).json(response);
};

export const fetchUsersPodcastsHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await podcastController.fetchUsersPodcasts(req);

    res.status(response.code).json(response);
});

export const singlePodcastHandler = async (req: Request, res: Response) =>  {
    const response = await podcastController.singlePodcast(req);

    res.status(response.code).json(response);
};

export const deletePodcastHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await podcastController.deletePodcast(req);

    res.status(response.code).json(response);
});

export const changePodcastStatusHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await podcastController.changePodcastStatus(req);

    res.status(response.code).json(response);
});