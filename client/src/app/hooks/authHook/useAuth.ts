import { useMutation, useQueryClient } from 'react-query';
import { useAuthApi } from './useAuthApi';
import { types } from '../../../../types/models';

export const useAuthSignIn = () => {
  const api = useAuthApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<types.AuthResponse>,
    Error,
    types.AuthRequest
  >({
    mutationFn: (requestParameters: types.AuthRequest) => {
      return api.signIn(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['car_calculator'] });
    },
    onError: (error: Error) => {
      console.error('Error calculating cart:', error);
    },
  });
};
