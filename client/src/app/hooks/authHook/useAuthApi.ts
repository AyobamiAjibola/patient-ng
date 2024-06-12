import { types } from '../../../../types/models';
import useAxiosAuth from '../useAxiosAuth';

export const useAuthApi = () => {
  const axiosAuth = useAxiosAuth();

  const signIn = async (
    requestParameters: types.AuthRequest
  ): Promise<types.ApiResponseSuccess<types.AuthResponse>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<types.AuthResponse>>
      ('/sign-in', requestParameters);
    return response.data;
  };

  return {
    signIn,
  };
};
