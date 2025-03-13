import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Outfit} from 'next/font/google' 
import { Montserrat } from "next/font/google";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";




export const metadata = {
  title: "Equiskill-AI"
};

const outfit = Montserrat({subsets:['latin']});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <GoogleOneTap/>
      <body
        className={outfit.className}
      >
      
          {children}
        
        
      </body>
    </html>
    </ClerkProvider>
  );
}
