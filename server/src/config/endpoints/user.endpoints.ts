import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { 
    deactivateUserHandler, 
    getAllUserHandler, 
    getSingleUserHandler, 
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
        name: 'deactivate user',
        method: 'put',
        path: '/deactivate-user',
        handler: deactivateUserHandler
    },
]

export default userEndpoints;