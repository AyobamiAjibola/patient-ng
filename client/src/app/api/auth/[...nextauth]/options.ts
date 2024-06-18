import { NextAuthOptions } from 'next-auth';
import { decode } from 'jsonwebtoken';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '@/app/Client';

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
  pages: {
    signIn: '/signin',
  },
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
        } catch (error) {
          console.error('Authentication error:', error);
          // Return a specific error response to the client
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    session: async ({ session, token }: any) => {
      session.user = token;
      return session;
    },
  },
};
