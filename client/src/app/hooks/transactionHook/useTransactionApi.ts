import { types } from "../../../../types/models";
import useAxiosAuth from "../useAxiosAuth";


export const useTransactionApi = () => {
    const axiosAuth = useAxiosAuth();

    const donate = async (requestParameters: string): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.post<
          types.ApiResponseSuccess<any>>
          (`/donate`, requestParameters);
        return response.data;
    };

    const initTransaction = async (requestParameters: string): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.post<
          types.ApiResponseSuccess<any>>
          (`/init-transaction`, requestParameters);
        return response.data;
    };

    return {
        donate,
        initTransaction
    };
}