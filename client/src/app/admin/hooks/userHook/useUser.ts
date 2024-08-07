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

export const useFindUser = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<types.CreateUserResponse>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.findUser(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['find_user'] });
    },
    onError: (error: Error) => {
      console.error('Error finding user:', error);
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

export const useChangePassword = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.changePassword(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['change-password'] });
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

export const usePostAward = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.createAward(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['create-award'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useUpdateAward = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.updateAward(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['update-award'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useGetSingleAward = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.getSingleAward(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['single-award'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useGetAwards = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.fetchAwards();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-awards'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useDeleteAward = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.deleteAward(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['delete-award'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useSiteVisit = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: () => {
      return api.siteVisit();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['site-visit'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useDashData = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: () => {
      return api.dashData();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-dash-data'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useDashDataGraph = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.dashDataGraph(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-dash-data-graph'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useCreateHospital = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.createHospital(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['create-hospital'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useGetHospitals = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: () => {
      return api.getHospitals();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-hospitals'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useGetDocs = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: () => {
      return api.getDocs();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-docs'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useUpdateTC = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.updateTermsAndCondition(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['update-t-c'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useAboutUs = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.updateAboutUs(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-contact-us'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useDeleteHospital = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.deleteHospital(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['delete-hospital'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useUploadAdvocacyFile = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: string) => {
      return api.uploadAdvocacyFile(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['upload-file'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useGetAdvocacyFiles = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: () => {
      return api.getFiles();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-files'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useDeleteAdvocacyFile = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: number) => {
      return api.deleteFile(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['delete-file'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useContactUs = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.contactUs(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['contact-us'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useInsightsRatingsReports = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.insightsRatingsData(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['insights-rating-report'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};

export const useChangeReviewStatus = () => {
  const api = useUserApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.changeReviewState(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['insights-rating-report'] });
    },
    onError: (error: Error) => {
      console.error('Error:', error);
    },
  });
};