import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Outfit} from 'next/font/google' 
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import GoogleOneTapWrapper from "@/components/GoogleOneTapWrapper";




export const metadata = {
  title: "Equiskill-AI"
};

const outfit = Montserrat({subsets:['latin']});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <GoogleOneTapWrapper />
          {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
