import { useMutation, useQueryClient } from 'react-query';
import { useTransactionApi } from './useTransactionApi';
import { types } from '../../../../types/models';

export const useDonate = () => {
    const api = useTransactionApi();
    const queryClient = useQueryClient();

    return useMutation<
        types.ApiResponseSuccess<any>,
        Error,
        any
    >({
        mutationFn: (requestParameters: any) => {
            return api.donate(requestParameters);
        },
            onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['donate'] });
        },
            onError: (error: Error) => {
            console.error('Transaction:', error);
        },
    });
}

export const useInitTransaction = () => {
    const api = useTransactionApi();
    const queryClient = useQueryClient();

    return useMutation<
        types.ApiResponseSuccess<any>,
        Error,
        any
    >({
        mutationFn: (requestParameters: any) => {
            return api.initTransaction(requestParameters);
        },
            onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['init_transaction'] });
        },
            onError: (error: Error) => {
            console.error('Transaction:', error);
        },
    });
}