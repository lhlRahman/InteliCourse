import { SignIn } from "@clerk/nextjs";

export default function Page() {

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <SignIn redirectUrl={"/dashboard/courses"} />
    </div>
  );
}