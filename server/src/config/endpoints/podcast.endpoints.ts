import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { 
    createPodcastCategoryHandler, 
    createPodcastHandler,
    deletePodcastCategoryHandler, 
    deletePodcastHandler,
    fetchUsersPodcastsHandler, 
    fetchPodcastCategoriesHandler,
    singlePodcastHandler,
    updatePodcastHandler,
    podcastsHandler,
    changePodcastStatusHandler
} from '../../routes/podcastRoute';

const podcastEndpoints: RouteEndpoint  = [
    {
        name: 'post podcast category',
        method: 'post',
        path: '/post-podcast-category',
        handler: createPodcastCategoryHandler
    },
    {
        name: 'delete podcast category',
        method: 'delete',
        path: '/delete-podcast-category/:podcastCategoryId',
        handler: deletePodcastCategoryHandler
    },
    {
        name: 'fetch podcast categories',
        method: 'get',
        path: '/get-podcast-categories',
        handler: fetchPodcastCategoriesHandler
    },
    {
        name: 'create podcast',
        method: 'post',
        path: '/post-podcast',
        handler: createPodcastHandler
    },
    {
        name: 'update podcast',
        method: 'put',
        path: '/update-podcast/:podcastId',
        handler: updatePodcastHandler
    },
    {
        name: 'fetch podcasts',
        method: 'get',
        path: '/get-podcasts',
        handler: podcastsHandler
    },
    {
        name: 'fetch users podcasts',
        method: 'get',
        path: '/get-user-podcasts',
        handler: fetchUsersPodcastsHandler
    },
    {
        name: 'get single podcasts',
        method: 'get',
        path: '/get-single-podcast/:podcastId',
        handler: singlePodcastHandler
    },
    {
        name: 'delete podcast',
        method: 'delete',
        path: '/delete-podcast/:podcastId',
        handler: deletePodcastHandler
    },
    {
        name: 'change podcast status',
        method: 'put',
        path: '/change-podcast-status/:podcastId',
        handler: changePodcastStatusHandler
    }
];

export default podcastEndpoints;