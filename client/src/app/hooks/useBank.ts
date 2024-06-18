import { useMutation } from 'react-query';
import useAxiosAuth from './useAxiosAuth';
import { useEffect } from 'react';

interface IBank {
    accountNumber?: string;
    bankCode?: string;
}

export default function useBank() {
    const axiosAuth = useAxiosAuth();

    const verifyBank = useMutation(async (item: IBank) => {
      return axiosAuth.post('/verify-bank-account', item);
    });

    const getBanks = useMutation(async () => {
        try {
          const response = await axiosAuth.get(`/banks`);
          return response.data;
        } catch (error) {
          console.log('Error Fetching Banks');
        }
    });

    const verifyBankError = verifyBank.error as any;
    const getBankError = getBanks.error as any;

    useEffect(() => {
        const fetchBanks = () => {
            try {
                getBanks.mutateAsync();
            } catch (error) {
              // Handle error
              console.error("Error fetching user:", error);
            }
          };
      
          fetchBanks();
    },[]);

    return {
        verifyBank,
        verifyBankIsLoading: verifyBank.isLoading,
        verifyBankIsError: verifyBank.isError,
        verifyBankError: verifyBankError?.response?.data.message,
        verifyBankIsSuccess: verifyBank.isSuccess,
        verified: verifyBank.data?.data?.result,
        banks: getBanks.data?.results,
        getBanksIsLoading: getBanks.isLoading,
        getBanksIsError: getBanks.isError,
        getBanksError: getBankError?.response?.data.message,
        getBanksIsSuccess: getBanks.isSuccess,
    }
}
