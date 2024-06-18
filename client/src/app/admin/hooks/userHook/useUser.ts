import { useMutation, useQueryClient } from 'react-query';
import { useUserApi } from './useUserApi';
import { types } from '../../../../../types/models';

export const useCreateUser = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<types.CreateUserResponse>,
    Error,
    types.CreateUserRequest
  >({
    mutationFn: (requestParameters: types.CreateUserRequest) => {
      return api.createUser(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['create_user'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useFetchUsers = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error
  >({
    mutationFn: () => {
      return api.getUsers();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetch_users'] });
    },
    onError: (error: Error) => {
      console.error('Error getting user:', error);
    },
  });
};

export const useFetchSingleUser = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    string
  >({
    mutationFn: (requestParameters: string) => {
      return api.getSingleUser(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['single_user'] });
    },
    onError: (error: Error) => {
      console.error('Error getting user:', error);
    },
  });
};

export const useUpdateUser = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.updateUser(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['edit_user'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useForgotPassword = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    string
  >({
    mutationFn: (requestParameters: string) => {
      return api.forgotPassword({email: requestParameters});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['forgot-password'] });
    },
    onError: (error: Error) => {
      console.error('Error getting user:', error);
    },
  });
};

export const useResetPassword = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.resetPassword(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reset-password'] });
    },
    onError: (error: Error) => {
      console.error('Error getting user:', error);
    },
  });
};

export const useSignUp = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.signUp(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sign-up'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useSendSignUpOtp = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    string
  >({
    mutationFn: (requestParameters: string) => {
      return api.sendSignUpToken({email: requestParameters});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['send-sign-up-otp'] });
    },
    onError: (error: Error) => {
      console.error('Error getting user:', error);
    },
  });
};

export const useValidateSignUpOtp = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.validateSignUpToken(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['validate-sign-up-otp'] });
    },
    onError: (error: Error) => {
      console.error('Error getting user:', error);
    },
  });
};

export const useUpdateUserOnboarding = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.updateUserOnboarding(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['update-user-onboarding'] });
    },
    onError: (error: Error) => {
      console.error('Error getting user:', error);
    },
  });
};

export const useResetUserPassword = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.resetUserPassword(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reset-user-password'] });
    },
    onError: (error: Error) => {
      console.error('Error getting user:', error);
    },
  });
};

export const useToggleUserStatus = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.toggleUserStatus(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['toggle-user-status'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};
