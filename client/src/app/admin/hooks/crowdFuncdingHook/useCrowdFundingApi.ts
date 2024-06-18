import useAxiosAuth from "@/app/hooks/useAxiosAuth";
import { types } from "../../../../../types/models";


export const useCrowdFundingApi = () => {
    const axiosAuth = useAxiosAuth();

    const createCrowdFunding = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('fundraisingFor', `${data.firstName} ${data.lastName}`);
        formData.append('accountNumber', data.accountNumber);
        formData.append('accountName', data.accountName);
        formData.append('bankCode', data.bankCode);
        formData.append('bank', data.bank);
        formData.append('state', data.state);
        formData.append('lga', data.lga);
        formData.append('amountNeeded', data.amount);
        formData.append('image', data.image);
        formData.append('address', data.address);

        const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        (`/post-crowedFunding`, formData);
        return response.data;
    };

    const updateCrowdFunding = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('fundraisingFor', `${data.firstName} ${data.lastName}`);
        formData.append('accountNumber', data.accountNumber);
        formData.append('accountName', data.accountName);
        formData.append('bankCode', data.bankCode);
        formData.append('bank', data.bank);
        formData.append('state', data.state);
        formData.append('lga', data.lga);
        formData.append('amountNeeded', data.amount);
        formData.append('image', data.image);
        formData.append('address', data.address);

        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/post-crowedFunding/${data.crowdFundingId}`, formData);
        return response.data;
    };

    const getSingleCrowdfunding = async (requestParameters: any): Promise<types.ApiResponseSuccess<any>> => {
      const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/single-crowedfunding/${requestParameters}`);
      return response.data;
    };

    const deleteCrowdfunding = async (requestParameters: string): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.delete<
          types.ApiResponseSuccess<any>>
          (`/delete-crowedFunding/${requestParameters}`);
        return response.data;
    };

    const getCrowdfundings = async (): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
          types.ApiResponseSuccess<any>>
          (`/get-crowedFundings`);
        return response.data;
    };

    const getUserCrowdfundings = async (): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
          types.ApiResponseSuccess<any>>
          (`/fetch-users-crowedFunding`);
        return response.data;
    };

    const activateCrowdfunding = async (requestParameters: string): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
          types.ApiResponseSuccess<any>>
          (`/activate-crowedFunding/${requestParameters}`);
        return response.data;
    };

    const markCrowdfundingDone = async (requestParameters: string): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
          types.ApiResponseSuccess<any>>
          (`/mark-crowedFunding-done/${requestParameters}`);
        return response.data;
    };

    const activeCrowdfunding = async (requestParameters: string): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
          types.ApiResponseSuccess<any>>
          (`/active-crowdfunding/${requestParameters}`);
        return response.data;
    };

    const likeCrowdfunding = async (requestParameters: string): Promise<types.ApiResponseSuccess<any>> => {
      const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/like-crowdfunding/${requestParameters}`);
      return response.data;
  };

    return {
        createCrowdFunding,
        likeCrowdfunding,
        activeCrowdfunding,
        markCrowdfundingDone,
        activateCrowdfunding,
        getUserCrowdfundings,
        getCrowdfundings,
        getSingleCrowdfunding,
        deleteCrowdfunding,
        updateCrowdFunding
    };
};
    