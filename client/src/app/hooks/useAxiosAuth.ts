"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosAuth } from "@/app/Client";
import axios from "axios";

const useAxiosAuth = () => {
  const { data: session, update } = useSession();
  const refreshToken = session?.user.refreshToken;
  
  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config: any) => {

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = session?.user?.accessToken;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const prevRequest = error?.config;
        prevRequest.sent = false;
        if (error?.response?.data.message.includes('TokenExpiredError') || error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          if(refreshToken) {
            const customTokenResult = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/get-access-token`, {
              refreshToken: refreshToken
            });
            console.log('are you here 2')
            if (customTokenResult.data.code === 200) {
              // Custom token received, sign in with it
              // const userCredential = await signInWithCustomToken(auth, customTokenResult.data.result);
              // const idToken = await userCredential.user.getIdToken();
              const idToken = customTokenResult.data.result;
              
              //save the new access token to the next-auth session
              const updateSession = async () => {
                if(idToken) {
                  await update({
                    ...session,
                    user: {
                      ...session?.user,
                      accessToken: idToken
                    },
                  });
                }
              }
              await updateSession();

              prevRequest.headers["Authorization"] = idToken;
              return axiosAuth(prevRequest);
            }
          }
        }

      return Promise.reject(error);
    }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return axiosAuth;
};

export default useAxiosAuth;
