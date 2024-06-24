import { useMutation, useQueryClient } from 'react-query';
import { types } from '../../../../../types/models';
import { useWebinarApi } from './useWebinarApi';

export const usePostWebinar = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.postWebinar(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['post_webinar'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useUpdateWebinar = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.updateWebinar(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['update_webinar'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const usePostWebinarCategory = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.postWebinarCategory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['post_webinar_category'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useDeleteWebinarCategory = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.deleteWebinarCategory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['delete_webinar_category'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useGetWebinarCategories = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.getWebinarCategories();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_webinar_categories'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useGetWebinars = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.getWebinars();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_webinars'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useGetSingleWebinar = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.getSingleWebinar(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_webinar'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useGetUsersWebinars = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.getUserWebinars(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_users_webinar'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useCreateWebinarWaitlist = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.createWebinarWaitlist(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['post_webinar_waitlist'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useDeleteWebinarWaitlist = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.deleteWebinarWaitlistUser(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['delete_webinar_waitlist'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useGetWebinarWaitlist = () => {
    const api = useWebinarApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.getWebinarWaitlistUsers();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_webinar_waitlist'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};