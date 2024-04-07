// UserInputForm.js
"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useData } from "../context/DataContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import UploadFile from "./ui/UploadFile";
import { BiLoader } from "react-icons/bi";

export function UserInputForm() {
  const auth = useAuth();
  const { setUser, addAlert } = useData();
  const [isUploadingDone, setIsUploadingDone] = useState(null);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    resume: "",
    bio: "",
  });

  const handleResume = (text) => {
    setInputs({
      ...inputs,
      resume: text,
    });
  };

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploadingDone !== null && isUploadingDone === false) {
      return;
    }
    inputs.clerkId = auth.userId;
    console.log(inputs);
    axios
      .post("/api/users/create", inputs)
      .then((res) => {
        if (res.data.status === 201) {
          setUser(res.data.data);
          window.location.replace("/dashboard/courses");
        } else {
          addAlert({ message: res.data.message, type: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
        Complete
      </h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label
              className="text-sm font-medium text-gray-700 block mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
              id="email"
              name="email"
              placeholder="example@domain.com"
              type="email"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="text-sm font-medium text-gray-700 block mb-2"
              htmlFor="first-name"
            >
              First Name
            </label>
            <Input
              className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
              id="first-name"
              name="firstName"
              placeholder="Your first name"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="text-sm font-medium text-gray-700 block mb-2"
              htmlFor="last-name"
            >
              Last Name
            </label>
            <Input
              className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
              id="last-name"
              name="lastName"
              placeholder="Your last name"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-700 block mb-2"
            htmlFor="bio"
          >
            Bio
          </label>
          <Textarea
            className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
            id="bio"
            name="bio"
            placeholder="Write about some activities and experiences you enjoy doing or have completed. Explain what you liked about each and what aspects you have excelled at."
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-700 block mb-2"
            htmlFor="bio"
          >
            Resume
          </label>
          <UploadFile
            handleResume={handleResume}
            setIsUploadingDone={setIsUploadingDone}
            isUploadingDone={isUploadingDone}
          />
        </div>
        <div className="text-center">
          <Button
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 mt-4"
            onClick={(e) => handleSubmit(e)}
          >
            {isUploadingDone === false ? (
              <BiLoader className="w-6 h-6 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
