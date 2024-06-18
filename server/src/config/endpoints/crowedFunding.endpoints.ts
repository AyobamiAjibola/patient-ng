import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { 
    activateCrowdFundingHandler, 
    createCrowdFundingHandler, 
    crowdFundingsHandler, 
    deleteCrowdFundingHandler, 
    fetchUsersCrowdFundingHandler, 
    getActiveCrowdfundingHandler, 
    likeCrowdFundingHandler, 
    markCrowdFundingDoneHandler, 
    singleCrowdFundingHandler, 
    updateCrowdFundingHandler
} from '../../routes/crowedFundingRoute';

const crowedFundingEndpoints: RouteEndpoint  = [
    {
        name: 'activate crowedFunding',
        method: 'put',
        path: '/activate-crowedFunding/:crowdFundingId',
        handler: activateCrowdFundingHandler
    },
    {
        name: 'mark crowedFunding as done',
        method: 'put',
        path: '/mark-crowedFunding-done/:crowdFundingId',
        handler: markCrowdFundingDoneHandler
    },
    {
        name: 'get active crowdfunding',
        method: 'get',
        path: '/active-crowdfunding/:userId',
        handler: getActiveCrowdfundingHandler
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
        path: '/update-crowedFunding/:crowdFundingId',
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
        path: '/single-crowedfunding/:crowdFundingId',
        handler: singleCrowdFundingHandler
    },
    {
        name: 'delete crowedFunding',
        method: 'delete',
        path: '/delete-crowedFunding/:crowdFundingId',
        handler: deleteCrowdFundingHandler
    },
    {
        name: 'like crowedFunding',
        method: 'put',
        path: '/like-crowdfunding/:crowdFundingId',
        handler: likeCrowdFundingHandler
    }
];

export default crowedFundingEndpoints;