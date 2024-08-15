import { NextAuthOptions } from 'next-auth';
import { decode } from 'jsonwebtoken';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '@/app/Client';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';

interface IProps {
  email: string;
  level: number;
  accessToken: string;
  refreshToken: string;
  isAdmin: boolean;
  userType: string[];
  fullName: string;
  userId: string;
}

interface ICredencials {
  email: string;
  password: string;
}

interface Payload {
  level: number;
  isAdmin: boolean;
  userType: string[];
  fullName: string;
  userId: string;
}

export const options: NextAuthOptions = {
  // pages: {
  //   signIn: '/signin',
  // },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        try {
          const { email, password } = credentials as ICredencials;
          const userCredential: any = await axios.post('/sign-in', {
            email,
            password,
          });
          
          if (userCredential) {
            const { tokens } = userCredential.data;
            const decodedToken = decode(tokens.accessToken) as Payload;
            const payload: IProps = {
              email: email,
              level: decodedToken?.level,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
              isAdmin: decodedToken?.isAdmin,
              userType: decodedToken?.userType,
              fullName: decodedToken?.fullName,
              userId: decodedToken.userId,
            };
            return payload;
          } else {
            return null;
          }
        } catch (error: any) {
          throw new Error(error.response.data.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      idToken: true,
      authorization: {
        params: {
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,  // Explicitly specifying redirect_uri
        }
      },
      async profile(profile) {
        try {
            const response = await axios.post('/sign-in-google', {
              email: profile.email
            });

            let payload;
            if(response.data.code === 200) {
              const { tokens } = response.data
              const decodedToken = decode(tokens.accessToken) as Payload;

              payload = {
                email: profile.email,
                level: decodedToken?.level,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                isAdmin: decodedToken?.isAdmin,
                userType: decodedToken?.userType,
                fullName: decodedToken?.fullName,
                userId: decodedToken?.userId,
              };
            }

            return {...payload, id: profile.sub};
        } catch (error: any) {
          
          const response = await axios.post('/sign-up-google', {
            email: profile.email,
            lastName: profile.family_name,
            firstName: profile.given_name,
            googleId: profile.sub,
            image: profile.picture
          });
          const { tokens } = response.data
          const decodedToken = decode(tokens.accessToken) as Payload;

          const payload: IProps = {
            email: profile.email,
            level: decodedToken?.level,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            isAdmin: decodedToken?.isAdmin,
            userType: decodedToken?.userType,
            fullName: decodedToken?.fullName,
            userId: decodedToken?.userId,
          };
          return {...payload, id: profile.sub};
        }
      }
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      let uri = '';
      if (isAllowedToSignIn) {
        try {
          await axios.post('/find-user', {
            email: user.email
          });
          
          // return `/signin?success=true`;
          return true;
        } catch (error: any) {
          // Redirect to the sign-in page with an error message
          return `/signin?error=Authentication Failed`;
        }
      } else {
        console.log('falsy');
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Handle the redirection logic
      if (url.startsWith('/')) {
        // Allows relative URLs
        return `${baseUrl}${url}`;
      } else if (url.startsWith(`${process.env.NEXT_PUBLIC_CLIENT_INITIAL}`)) {
        // Allows absolute URLs
        return url;
      }
      return baseUrl;
    },
    session: async ({ session, token }: any) => {
      session.user = token;
      return session;
    },
    jwt: async ({ token, user, trigger, session, account }) => {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
};
