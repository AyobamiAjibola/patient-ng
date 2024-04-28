import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { 
    changePasswordHandler,
    createUserHandler,
    getAccessTokenHandler,
    resetPasswordHandler,
    sendPasswordResetLinkHandler,
    sendSignUpOtpHandler, 
    signInAdminUserHandler, 
    signInHandler, 
    signUpHandler, 
    validateSignUpOtpHandler 
} from '../../routes/authRoute';

const authEndpoints: RouteEndpoint  = [
    {
        name: 'send-sign-up-otp',
        method: 'post',
        path: '/send-signup-otp',
        handler: sendSignUpOtpHandler
    },
    {
        name: 'validate-sign-up-otp',
        method: 'post',
        path: '/validate-signup-otp',
        handler: validateSignUpOtpHandler
    },
    {
        name: 'sign-up',
        method: 'post',
        path: '/sign-up',
        handler: signUpHandler
    },
    {
        name: 'sign-in',
        method: 'post',
        path: '/sign-in',
        handler: signInHandler
    },
    {
        name: 'sign-in-admin',
        method: 'post',
        path: '/sign-in-admin',
        handler: signInAdminUserHandler
    },
    {
        name: 'change-password',
        method: 'put',
        path: '/change-password',
        handler: changePasswordHandler
    },
    {
        name: 'get-access-token',
        method: 'post',
        path: '/get-access-token',
        handler: getAccessTokenHandler
    },
    {
        name: 'send-password-reset-link',
        method: 'post',
        path: '/send-password-reset-link',
        handler: sendPasswordResetLinkHandler
    },
    {
        name: 'reset-password',
        method: 'post',
        path: '/reset-password',
        handler: resetPasswordHandler
    },
    {
        name: 'create user',
        method: 'post',
        path: '/create-user',
        handler: createUserHandler
    }
]

export default authEndpoints;