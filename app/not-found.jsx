"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Component() {
  useEffect(() => {
    document.title = "SkillSync | Not Found";
  }, []);
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-grey-600">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-blue-900 text-5xl md:text-7xl font-bold">404</h2>
          <p className="mt-2 text-lg md:text-2xl text-blue-600">
            Oops! You seem lost.
          </p>
          <p className="mt-2 text-sm md:text-lg text-blue-500">
            The page you're looking is currently studying, you should as well.
          </p>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            className="border p-2 border-gray-600 rounded-lg bg-sky-400 text-white hover:bg-sky-500 w-32 flex justify-center items-center"
            href="/"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
