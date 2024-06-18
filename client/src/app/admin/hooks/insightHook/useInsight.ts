import { useMutation, useQueryClient } from 'react-query';
import { types } from '../../../../../types/models';
import { useInsightApi } from './useInsightApi';

export const useCreateInsight = () => {
  const api = useInsightApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.createInsight(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['create_insight'] });
    },
    onError: (error: Error) => {
      console.error('Error creating insight:', error);
    },
  });
};

export const useUpdateInsight = () => {
  const api = useInsightApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.updateInsight(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['update_advocacy'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const usePostInsightReview = () => {
  const api = useInsightApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.postInsightReview(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['update_advocacy_status'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useGetInsights = () => {
  const api = useInsightApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: () => {
      return api.getInsights();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get_advocacies'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useDeleteInsight = () => {
  const api = useInsightApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.deleteInsight(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['delete_advocacy'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useGetSingleInsight = () => {
  const api = useInsightApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.getSingleInsight(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get_advocacy'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useGetUserInsights = () => {
  const api = useInsightApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.getUsersInsights(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get_users_advocacies'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};