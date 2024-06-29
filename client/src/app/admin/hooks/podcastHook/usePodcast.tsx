import { useMutation, useQueryClient } from 'react-query';
import { types } from '../../../../../types/models';
import { usePodcastApi } from './usePodcastApi';

export const usePostPodcast = () => {
  const api = usePodcastApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.postPodcast(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['post_podcast'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useUpdatePodcast = () => {
    const api = usePodcastApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.updatePodcast(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['update_podcast'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const usePostPodcastCategory = () => {
    const api = usePodcastApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.postPodcastCategory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['post_podcast_category'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useDeletePodcastCategory = () => {
    const api = usePodcastApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.deletePodcastCategory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['delete_podcast_category'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useGetPodcastCategories = () => {
    const api = usePodcastApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: () => {
        return api.getPodcastCategories();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_podcast_categories'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useGetPodcasts = () => {
    const api = usePodcastApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: () => {
        return api.getPodcasts();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_podcasts'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useGetSinglePodcast = () => {
    const api = usePodcastApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.getSinglePodcast(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_podcast'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useGetUsersPodcasts = () => {
    const api = usePodcastApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.getUserPodcasts(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_users_podcast'] });
      },
      onError: (error: Error) => {
        console.error('Error:', error);
      },
    });
};

export const useDeletePodcast = () => {
  const api = usePodcastApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.deletePodcast(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['delete_podcast'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useUpdatePodcastStatus = () => {
  const api = usePodcastApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.changePodcastStatus(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['update_podcast_status'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};
