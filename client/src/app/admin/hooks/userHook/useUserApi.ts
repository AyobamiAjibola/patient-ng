import useAxiosAuth from "@/app/hooks/useAxiosAuth";
import { types } from "../../../../../types/models";
import { useSession } from "next-auth/react";


export const useUserApi = () => {
  const axiosAuth = useAxiosAuth();
  const {data: session} = useSession();

  const createUser = async (
    requestParameters: types.CreateUserRequest
  ): Promise<types.ApiResponseSuccess<types.CreateUserResponse>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<types.CreateUserResponse>>
      ('/create-user', requestParameters);
    return response.data;
  };

  const getUsers = async (): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.get<
      types.ApiResponseSuccess<any>>
      ('/get-all-users');
    return response.data;
  };

  const getSingleUser = async (requestParameters: string): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.get<
      types.ApiResponseSuccess<any>>
      (`/get-single-user/${requestParameters}`);
    return response.data;
  };

  const updateUser = async (
    data: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const formData = new FormData();

    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('state', data.state ? data.state : '');
    formData.append('lga', data.lga ? data.lga : '');
    formData.append('phone', data.phone);
    formData.append('age', data.age ? data.age.toString() : '');
    formData.append('gender', data.gender ? data.gender : '');
    formData.append('address', data.address ? data.address : '');
    formData.append('image', data.image);

    if(data.userType && data.userType.length > 0 && session?.user.isAdmin) {
      formData.append('userType', JSON.stringify(data.userType));
    }
 
    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      (`/update-user-profile/${data.userId}`, formData);
    return response.data;
  };

  const forgotPassword = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/send-password-reset-link', requestParameters);
    return response.data;
  };

  const resetPassword = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/reset-password', requestParameters);
    return response.data;
  };

  const signUp = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/sign-up', requestParameters);
    return response.data;
  };

  const sendSignUpToken = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/send-signup-otp', requestParameters);
    return response.data;
  };

  const validateSignUpToken = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/validate-signup-otp', requestParameters);
    return response.data;
  };

  const updateUserOnboarding = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      ('/update-user-onboarding', requestParameters);
    return response.data;
  };

  const resetUserPassword = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      ('/reset-user-password', requestParameters);
    return response.data;
  }; 

  const changePassword = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      ('/change-password', requestParameters);
    return response.data;
  }; 

  const toggleUserStatus = async (
    requestParameters: string
  ): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      (`/toggle-user-status/${requestParameters}` );
    return response.data;
  }; 

  const createAward = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/post-award', requestParameters);
    return response.data;
  };

  const updateAward = async (
    data: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      (`/update-award/${data.awardId}`, data);
    return response.data;
  };

  const fetchAwards = async (): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.get<
      types.ApiResponseSuccess<any>>
      (`/get-awards`);
    return response.data;
  };

  const getSingleAward = async (
    data: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.get<
      types.ApiResponseSuccess<any>>
      (`/get-single-award/${data}`);
    return response.data;
  };

  const deleteAward = async (
    data: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.delete<
      types.ApiResponseSuccess<any>>
      (`/delete-award/${data}`);
    return response.data;
  };

  const siteVisit = async (): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      (`/site-visit-count`);
    return response.data;
  };

  const dashData = async (): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.get<
      types.ApiResponseSuccess<any>>
      (`/dashboard-data`);
    return response.data;
  };

  const dashDataGraph = async (data: any): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      (`/dashboard-data-graph`, data);
    return response.data;
  };

  const createHospital = async (
    data: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('phone', data.phone);
    formData.append('website', data.website);
    formData.append('image', data.image);
    formData.append('hospitalName', data.hospitalName);
    formData.append('state', data.state);
    formData.append('lga', data.lga);

    if(data.services) {
      formData.append('services', JSON.stringify(data.services));
    }

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      ('/post-hospital', formData);
    return response.data;
  };

  const updateTermsAndCondition = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      ('/post-t-and-c', requestParameters);
    return response.data;
  };

  const updateAboutUs = async (
    requestParameters: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      ('/post-contact-about-us', requestParameters);
    return response.data;
  };

  const deleteHospital = async (
    id: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.delete<
      types.ApiResponseSuccess<any>>
      (`/delete-hospital/${id}`);
    return response.data;
  };

  const getHospitals = async (): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.get<
      types.ApiResponseSuccess<any>>
      (`/get-hospitals`);
    return response.data;
  };

  const getDocs = async (): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.get<
      types.ApiResponseSuccess<any>>
      (`/get-docs`);
    return response.data;
  };

  const uploadAdvocacyFile = async (
    data: any
  ): Promise<types.ApiResponseSuccess<any>> => {

    const formData = new FormData();

    formData.append('file', data.file);
    formData.append('description', data.description);
 
    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      (`/upload-advocacy-file`, formData);
    return response.data;
  };

  const getFiles = async (): Promise<types.ApiResponseSuccess<any>> => {
    const response = await axiosAuth.get<
      types.ApiResponseSuccess<any>>
      (`/get-advocacy-files`);
    return response.data;
  };

  const deleteFile = async (
    data: number
  ): Promise<types.ApiResponseSuccess<any>> => {

    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      (`/delete-advocacy-file`, { id: data });
    return response.data;
  };

  const contactUs = async (
    data: any
  ): Promise<types.ApiResponseSuccess<any>> => {
 
    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      (`/contact-us`, data);
    return response.data;
  };

  const insightsRatingsData = async (
    data: any
  ): Promise<types.ApiResponseSuccess<any>> => {
 
    const response = await axiosAuth.post<
      types.ApiResponseSuccess<any>>
      (`/get-insight-ratings`, data);
    return response.data;
  };

  const changeReviewState = async (
    data: any
  ): Promise<types.ApiResponseSuccess<any>> => {
 
    const response = await axiosAuth.put<
      types.ApiResponseSuccess<any>>
      (`/change-review-status/${data.reviewId}`, {status: data.status});
    return response.data;
  };

  return {
    deleteAward,
    changeReviewState,
    insightsRatingsData,
    contactUs,
    getFiles,
    uploadAdvocacyFile,
    deleteFile,
    getDocs,
    getHospitals,
    updateTermsAndCondition,
    updateAboutUs,
    deleteHospital,
    createHospital,
    dashData,
    dashDataGraph,
    siteVisit,
    getSingleAward,
    fetchAwards,
    updateAward,
    createAward,
    toggleUserStatus,
    changePassword,
    resetUserPassword,
    updateUserOnboarding,
    validateSignUpToken,
    resetPassword,
    sendSignUpToken,
    signUp,
    updateUser,
    forgotPassword,
    getSingleUser,
    getUsers,
    createUser,
  };
};
