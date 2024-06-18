import { useMutation, useQueryClient } from 'react-query';
import { types } from '../../../../../types/models';
import { useCrowdFundingApi } from './useCrowdFundingApi';

export const useCreateCrowdfunding = () => {
  const api = useCrowdFundingApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.createCrowdFunding(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['create_crowdfunding'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useUpdateCrowdfunding = () => {
  const api = useCrowdFundingApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.updateCrowdFunding(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['update_crowdfunding'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useGetSingleCrowdfunding = () => {
  const api = useCrowdFundingApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.getSingleCrowdfunding(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get_crowdfunding'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useDeleteCrowdfunding = () => {
  const api = useCrowdFundingApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.deleteCrowdfunding(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['delete_crowdfunding'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useGetCrowdfundings = () => {
  const api = useCrowdFundingApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: () => {
      return api.getCrowdfundings();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get_crowdfunding'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useGetUserCrowdfundings = () => {
  const api = useCrowdFundingApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: () => {
      return api.getUserCrowdfundings();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['delete_crowdfunding'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useActivateCrowdfunding = () => {
  const api = useCrowdFundingApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.activateCrowdfunding(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activate_crowdfunding'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useMarkCrowdfundingDone = () => {
  const api = useCrowdFundingApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.markCrowdfundingDone(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['mark_crowdfunding_done'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useGetActiveCrowdfunding = () => {
  const api = useCrowdFundingApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.activeCrowdfunding(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['active_crowdfunding'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useLikeCrowdfunding = () => {
  const api = useCrowdFundingApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.likeCrowdfunding(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['like_crowdfunding'] });
    },
    onError: (error: Error) => {
      console.error('Error liking:', error);
    },
  });
};