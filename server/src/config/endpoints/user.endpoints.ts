import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { 
    createAdvocacyHandler,
    createAwardHandler,
    createInsightHandler,
    dashboardDataHandler,
    dashboardDataUsersGraphHandler,
    deactivateUserHandler, 
    deleteAdvocacyHandler, 
    deleteAwardHandler, 
    deleteInsightHandler, 
    getAllAdvocaciesHandler, 
    getAllInsightsHandler, 
    getAllUserHandler, 
    getAwardsHandler, 
    getSingleAdvocateHandler, 
    getSingleAwardHandler, 
    getSingleInsightHandler, 
    getSingleUserHandler, 
    getUserAdvocaciesHandler, 
    getUserInsightsHandler, 
    reviewOnInsightHandler, 
    siteVisitCountHandler, 
    updateAdvocacyHandler, 
    updateAdvocacyStatusHandler, 
    updateAwardHandler, 
    updateInsightHandler, 
    updateUserOnboardingHandler, 
    updateUserProfileHandler
} from '../../routes/userRoute';

const userEndpoints: RouteEndpoint  = [
    {
        name: 'get all users',
        method: 'get',
        path: '/get-all-users',
        handler: getAllUserHandler
    },
    {
        name: 'get single user',
        method: 'get',
        path: '/get-single-user/:userId',
        handler: getSingleUserHandler
    },
    {
        name: 'update user',
        method: 'put',
        path: '/update-user-onboarding',
        handler: updateUserOnboardingHandler
    },
    {
        name: 'update user profile',
        method: 'put',
        path: '/update-user-profile/:userId',
        handler: updateUserProfileHandler
    },
    {
        name: 'toggle user-status',
        method: 'put',
        path: '/toggle-user-status/:userId',
        handler: deactivateUserHandler
    },
    //insight
    {
        name: 'post insight review',
        method: 'put',
        path: '/post-insight-review/:insightId',
        handler: reviewOnInsightHandler
    },
    {
        name: 'update insight',
        method: 'put',
        path: '/update-insight/:insightId',
        handler: updateInsightHandler
    },
    {
        name: 'create insight',
        method: 'post',
        path: '/create-insight',
        handler: createInsightHandler
    },
    {
        name: 'get insight',
        method: 'get',
        path: '/get-all-insights',
        handler: getAllInsightsHandler
    },
    {
        name: 'delete insight',
        method: 'delete',
        path: '/delete-insight/:insightId',
        handler: deleteInsightHandler
    },
    {
        name: 'get insight',
        method: 'get',
        path: '/get-single-insight/:insightId',
        handler: getSingleInsightHandler
    },
    {
        name: 'get user insights',
        method: 'get',
        path: '/get-user-insights/:userId',
        handler: getUserInsightsHandler
    },
    //advocacy
    {
        name: 'update advocacy status',
        method: 'put',
        path: '/update-advocacy-status/:advocacyId',
        handler: updateAdvocacyStatusHandler
    },
    {
        name: 'update advocacy',
        method: 'put',
        path: '/update-advocacy/:advocacyId',
        handler: updateAdvocacyHandler
    },
    {
        name: 'create advocacy',
        method: 'post',
        path: '/create-advocacy',
        handler: createAdvocacyHandler
    },
    {
        name: 'get advocacies',
        method: 'get',
        path: '/get-all-advocacies',
        handler: getAllAdvocaciesHandler
    },
    {
        name: 'delete advocacy',
        method: 'delete',
        path: '/delete-advocacy/:advocacyId',
        handler: deleteAdvocacyHandler
    },
    {
        name: 'get single advocacy',
        method: 'get',
        path: '/get-single-advocacy/:advocacyId',
        handler: getSingleAdvocateHandler
    },
    {
        name: 'get user advocacies',
        method: 'get',
        path: '/get-user-advocacies/:userId',
        handler: getUserAdvocaciesHandler
    },
    //Awards
    {
        name: 'post award',
        method: 'post',
        path: '/post-award',
        handler: createAwardHandler
    },
    {
        name: 'update award',
        method: 'put',
        path: '/update-award/:awardId',
        handler: updateAwardHandler
    },
    {
        name: 'get single award',
        method: 'get',
        path: '/get-single-award/:awardId',
        handler: getSingleAwardHandler
    },
    {
        name: 'get awards',
        method: 'get',
        path: '/get-awards',
        handler: getAwardsHandler
    },
    {
        name: 'delete award',
        method: 'delete',
        path: '/delete-award/:awardId',
        handler: deleteAwardHandler
    },
    {
        name: 'site visit count',
        method: 'put',
        path: '/site-visit-count',
        handler: siteVisitCountHandler
    },
    {
        name: 'dashboard data',
        method: 'get',
        path: '/dashboard-data',
        handler: dashboardDataHandler
    },
    {
        name: 'dashboard data graph',
        method: 'post',
        path: '/dashboard-data-graph',
        handler: dashboardDataUsersGraphHandler
    }
]

export default userEndpoints;