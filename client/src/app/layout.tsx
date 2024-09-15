import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Provider } from 'jotai';
import NextAuthSessionProvider from './providers/sessionProvider';
import QueryClientProviderWrapper from './QueryClientProvider';
import CustomThemeWrapper from "./components/CustomThemeWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}`),
  title: `${process.env.NEXT_PUBLIC_TITLE}`,
  description: `${process.env.NEXT_PUBLIC_DESC}`,
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_TITLE}`,
    description: `${process.env.NEXT_PUBLIC_DESC}`,
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 627,
        alt: "Patient.ng logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <CustomThemeWrapper>
      <Provider>
        <html lang="en">
          <body className={inter.className}>
            <QueryClientProviderWrapper>
              <NextAuthSessionProvider>
                {children}
              </NextAuthSessionProvider>
            </QueryClientProviderWrapper>
          </body>
        </html>
      </Provider>
    </CustomThemeWrapper>
  );
}
