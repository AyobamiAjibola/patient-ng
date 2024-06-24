import { useMutation, useQueryClient } from 'react-query';
import { types } from '../../../../../types/models';
import { usePatientStoriesApi } from './usePatientStoriesApi';

export const usePostStory = () => {
    const api = usePatientStoriesApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.postStory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['post_story'] });
      },
      onError: (error: Error) => {
        console.error('Error creating story:', error);
      },
    });
};

export const useUpdateStory = () => {
    const api = usePatientStoriesApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.updateStory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['update_story'] });
      },
      onError: (error: Error) => {
        console.error('Error updating story:', error);
      },
    });
};

export const useGetSingleStory = () => {
    const api = usePatientStoriesApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.getSingleStory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_story'] });
      },
      onError: (error: Error) => {
        console.error('Error getting story:', error);
      },
    });
};

export const useFetchStories = () => {
    const api = usePatientStoriesApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: () => {
        return api.fetchStories();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_stories'] });
      },
      onError: (error: Error) => {
        console.error('Error getting stories:', error);
      },
    });
};

export const useFetchUserStories = () => {
    const api = usePatientStoriesApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: () => {
        return api.fetchUserStories();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_user_stories'] });
      },
      onError: (error: Error) => {
        console.error('Error getting user stories:', error);
      },
    });
};

export const useDeleteStory = () => {
    const api = usePatientStoriesApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.deleteStory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['delete_story'] });
      },
      onError: (error: Error) => {
        console.error('Error deleting story:', error);
      },
    });
};

export const useRejectStory = () => {
    const api = usePatientStoriesApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.rejectStory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['reject_story'] });
      },
      onError: (error: Error) => {
        console.error('Error rejecting story:', error);
      },
    });
};

export const usePublishStory = () => {
    const api = usePatientStoriesApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.publishStory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['publish_story'] });
      },
      onError: (error: Error) => {
        console.error('Error publishing story:', error);
      },
    });
};
