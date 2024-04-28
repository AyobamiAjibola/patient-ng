import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { 
    activateCrowdFundingHandler, 
    createCrowdFundingHandler, 
    crowdFundingsHandler, 
    deleteCrowdFundingHandler, 
    fetchUsersCrowdFundingHandler, 
    singleCrowdFundingHandler, 
    updateCrowdFundingHandler
} from '../../routes/crowedFundingRoute';

const crowedFundingEndpoints: RouteEndpoint  = [
    {
        name: 'activate crowedFunding',
        method: 'get',
        path: '/activate-crowedFunding',
        handler: activateCrowdFundingHandler
    },
    {
        name: 'fetch users crowedFunding',
        method: 'get',
        path: '/fetch-users-crowedFunding',
        handler: fetchUsersCrowdFundingHandler
    },
    {
        name: 'post crowedFunding',
        method: 'post',
        path: '/post-crowedFunding',
        handler: createCrowdFundingHandler
    },
    {
        name: 'update crowedFunding',
        method: 'put',
        path: '/update-crowedFunding',
        handler: updateCrowdFundingHandler
    },
    {
        name: 'get crowedFundings',
        method: 'get',
        path: '/get-crowedFundings',
        handler: crowdFundingsHandler
    },
    {
        name: 'get single crowedFunding',
        method: 'get',
        path: '/single-crowedFunding',
        handler: singleCrowdFundingHandler
    },
    {
        name: 'delete crowedFunding',
        method: 'delete',
        path: '/delete-crowedFunding',
        handler: deleteCrowdFundingHandler
    }
];

export default crowedFundingEndpoints;