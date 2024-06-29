import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { 
    changeWebinarStatusHandler,
    createWebinarCategoryHandler, 
    createWebinarHandler, 
    createWebinarWaitlistHandler, 
    deleteWebinarCategoryHandler, 
    deleteWebinarHandler, 
    deleteWebinarWaitlistHandler, 
    fetchUsersWebinarsHandler, 
    fetchWebinarCategoriesHandler,
    singleWebinarHandler,
    updateWebinarHandler,
    webinarWaitlistHandler,
    webinarsHandler
} from '../../routes/webinarRoute';

const webinarEndpoints: RouteEndpoint  = [
    {
        name: 'post webinar category',
        method: 'post',
        path: '/post-webinar-category',
        handler: createWebinarCategoryHandler
    },
    {
        name: 'delete webinar category',
        method: 'delete',
        path: '/delete-webinar-category/:webinarCategoryId',
        handler: deleteWebinarCategoryHandler
    },
    {
        name: 'fetch webinar categories',
        method: 'get',
        path: '/get-webinar-categories',
        handler: fetchWebinarCategoriesHandler
    },
    {
        name: 'create webinar categories',
        method: 'post',
        path: '/post-webinar',
        handler: createWebinarHandler
    },
    {
        name: 'update webinar categories',
        method: 'put',
        path: '/update-webinar/:webinarId',
        handler: updateWebinarHandler
    },
    {
        name: 'fetch webinars',
        method: 'get',
        path: '/get-webinars',
        handler: webinarsHandler
    },
    {
        name: 'fetch users webinars',
        method: 'get',
        path: '/get-users-webinars/:userId',
        handler: fetchUsersWebinarsHandler
    },
    {
        name: 'get single webinars',
        method: 'get',
        path: '/get-single-webinar/:webinarId',
        handler: singleWebinarHandler
    },
    {
        name: 'delete webinar',
        method: 'delete',
        path: '/delete-webinar/:webinarId',
        handler: deleteWebinarHandler
    },
    {
        name: 'post webinar waitlist',
        method: 'post',
        path: '/post-webinar-waitlist',
        handler: createWebinarWaitlistHandler
    },
    {
        name: 'get webinar waitlist',
        method: 'get',
        path: '/get-webinar-waitlist',
        handler: webinarWaitlistHandler
    },
    {
        name: 'delete webinar waitlist',
        method: 'delete',
        path: '/delete-webinar-waitlist/:watchOnDemandId',
        handler: deleteWebinarWaitlistHandler
    },
    {
        name: 'update webinar status',
        method: 'put',
        path: '/update-webinar-status/:webinarId',
        handler: changeWebinarStatusHandler
    }
];

export default webinarEndpoints;