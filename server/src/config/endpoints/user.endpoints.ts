import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { 
    aboutAndContactUsHandler,
    changeReviewStatusHandler,
    createAdvocacyHandler,
    createAwardHandler,
    // createInsightHandler,
    dashboardDataHandler,
    dashboardDataUsersGraphHandler,
    deactivateUserHandler, 
    deleteAdvocacyHandler, 
    deleteAwardHandler, 
    deleteFileHandler, 
    deleteHospitalHandler, 
    deleteInsightHandler, 
    deleteUserHandler, 
    fetchFilesHandler, 
    findUserHandler, 
    getAllAdvocaciesHandler, 
    getAllInsightsHandler, 
    getAllReviewsHandler, 
    getAllUserHandler, 
    getAwardsHandler, 
    getDocsHandler, 
    getHospitalsHandler, 
    getInsightRatingsHandler, 
    getSingleAdvocateHandler, 
    getSingleAwardHandler, 
    getSingleHospitalHandler, 
    getSingleInsightHandler, 
    getSingleReviewHandler, 
    getSingleUserHandler, 
    getUserAdvocaciesHandler, 
    getUserInsightsHandler, 
    postHospitalHandler, 
    postTAndCHandler, 
    reviewOnInsightHandler, 
    siteVisitCountHandler, 
    toggleHospitalVerificationHandler, 
    updateAdvocacyHandler, 
    updateAdvocacyStatusHandler, 
    updateAwardHandler, 
    updateHospitalHandler, 
    // updateInsightHandler, 
    updateUserOnboardingHandler, 
    updateUserProfileHandler,
    uploadMenuFileHandler
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
    {
        name: 'delete user',
        method: 'delete',
        path: '/delete-user/:userId',
        handler: deleteUserHandler
    },
    //insight
    {
        name: 'post insight review',
        method: 'put',
        path: '/post-insight-review/:insightId',
        handler: reviewOnInsightHandler
    },
    // {
    //     name: 'update insight',
    //     method: 'put',
    //     path: '/update-insight/:insightId',
    //     handler: updateInsightHandler
    // },
    // {
    //     name: 'create insight',
    //     method: 'post',
    //     path: '/create-insight',
    //     handler: createInsightHandler
    // },
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
    },
    {
        name: 'post hospital',
        method: 'post',
        path: '/post-hospital',
        handler: postHospitalHandler
    },
    {
        name: 'get hospitals',
        method: 'get',
        path: '/get-hospitals',
        handler: getHospitalsHandler
    },
    {
        name: 'get ipatient docs',
        method: 'get',
        path: '/get-docs',
        handler: getDocsHandler
    },
    {
        name: 'post T and C',
        method: 'put',
        path: '/post-t-and-c',
        handler: postTAndCHandler
    },
    {
        name: 'post about and contact us',
        method: 'put',
        path: '/post-contact-about-us',
        handler: aboutAndContactUsHandler
    },
    {
        name: 'delete hospital',
        method: 'delete',
        path: '/delete-hospital/:id',
        handler: deleteHospitalHandler
    },
    {
        name: 'upload advocacy file',
        method: 'post',
        path: '/upload-advocacy-file',
        handler: uploadMenuFileHandler
    },
    {
        name: 'fetch files',
        method: 'get',
        path: '/get-advocacy-files',
        handler: fetchFilesHandler
    },
    {
        name: 'delete file',
        method: 'post',
        path: '/delete-advocacy-file',
        handler: deleteFileHandler
    },
    {
        name: 'insight ratings',
        method: 'post',
        path: '/get-insight-ratings',
        handler: getInsightRatingsHandler
    },
    {
        name: 'get all reviews',
        method: 'get',
        path: '/get-all-reviews',
        handler: getAllReviewsHandler
    },
    {
        name: 'get single review',
        method: 'get',
        path: '/get-single-review',
        handler: getSingleReviewHandler
    },
    {
        name: 'change review status',
        method: 'put',
        path: '/change-review-status/:reviewId',
        handler: changeReviewStatusHandler
    },
    {
        name: 'find user',
        method: 'post',
        path: '/find-user',
        handler: findUserHandler
    },
    {
        name: 'toggle hospital verification',
        method: 'put',
        path: '/toggle-verification/:hospitalId',
        handler: toggleHospitalVerificationHandler
    },
    {
        name: 'update hospital info',
        method: 'put',
        path: '/update-hospital-info/:hospitalId',
        handler: updateHospitalHandler
    },
    {
        name: 'get single hospital',
        method: 'get',
        path: '/get-single-hospital/:hospitalId',
        handler: getSingleHospitalHandler
    }
]

export default userEndpoints;