"use client";
import { UserInputForm } from "@/components/UserInputForm";
import { useData } from "@/context/DataContext";
import { useEffect } from "react";

const Page = () => {
  const { user } = useData();
  useEffect(() => {
    console.log(user);
    if (user.bio) {
      window.location.replace("/dashboard");
    }
  }, []);

  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <UserInputForm />
    </div>
  );
};

export default Page;
