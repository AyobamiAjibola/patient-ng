import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { 
    donateyHandler, 
    fetchPaymentRequestHandler, 
    getBanksHandler, 
    initTransactionCallbackHandler, 
    makePaymentHandler, 
    requestPaymentHandler
} from '../../routes/transactionRoute';

const transactioEndpoints: RouteEndpoint  = [
    {
        name: 'donate',
        method: 'post',
        path: '/donate',
        handler: donateyHandler
    },
    {
        name: 'initiate transaction',
        method: 'post',
        path: '/init-transaction',
        handler: initTransactionCallbackHandler
    },
    {
        name: 'fetch payment requests',
        method: 'get',
        path: '/get-payment-requests',
        handler: fetchPaymentRequestHandler
    },
    {
        name: 'request payment',
        method: 'get',
        path: '/request-payment',
        handler: requestPaymentHandler
    },
    {
        name: 'make payment',
        method: 'get',
        path: '/make-payment',
        handler: makePaymentHandler
    },
    {
        name: 'bank',
        method: 'get',
        path: '/banks',
        handler: getBanksHandler
    }
];

export default transactioEndpoints;