import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { DataProvider } from "../context/DataContext";
import AlertWrapper from "../components/AlertWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InteliCourse",
  description: "InteliCourse a platfrom where you can learn everything about anything",
};

export default function RootLayout({ children }) {
  return (
    // <ClerkProvider>
    //   <html lang="en">
    //     <body>{children}</body>
    //   </html>
    // </ClerkProvider>
    <ClerkProvider>
      <DataProvider>
        <html lang="en" className="bg-black">
          <body className={inter.className}>
            <AlertWrapper />
            <Navbar />
            {children}
          </body>
        </html>
      </DataProvider>
    </ClerkProvider>
  );
}
