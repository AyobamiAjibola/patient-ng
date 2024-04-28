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
    podcastsHandler
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
        path: '/delete-podcast-category',
        handler: deletePodcastCategoryHandler
    },
    {
        name: 'fetch podcast categories',
        method: 'get',
        path: '/get-podcast-categories',
        handler: fetchPodcastCategoriesHandler
    },
    {
        name: 'create podcast categories',
        method: 'post',
        path: '/post-podcast',
        handler: createPodcastHandler
    },
    {
        name: 'update podcast categories',
        method: 'put',
        path: '/update-podcast',
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
        path: '/get-users-podcasts',
        handler: fetchUsersPodcastsHandler
    },
    {
        name: 'get single podcasts',
        method: 'get',
        path: '/get-single-podcast',
        handler: singlePodcastHandler
    },
    {
        name: 'delete podcast',
        method: 'delete',
        path: '/delete-podcast',
        handler: deletePodcastHandler
    }
];

export default podcastEndpoints;