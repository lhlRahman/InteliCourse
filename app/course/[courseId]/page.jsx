"use client";

import { useParams } from "next/navigation";
import Course from "@/components/ChapterPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useData } from "@/context/DataContext";
import ChatPopup from "@/components/chatPopup";

const page = () => {
  const { courseId } = useParams();
  const { addAlert } = useData();
  const [course, setCourse] = useState({ units: [] });

  const getCourseById = async () => {
    axios
      .post(`/api/courses/getById/${courseId}`)
      .then((res) => {
        if (res.data.status === 201) {
          addAlert({
            message: "Course retrieved successfully",
            type: "success",
          });
          console.log(res.data.data);
          setCourse(res.data.data);
        } else {
          addAlert({
            message: res.data.message,
            type: "error",
          });
        }
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let retrievedCourse = false;
  useEffect(() => {
    if (courseId && !retrievedCourse) {
      retrievedCourse = true;
      getCourseById();
    }
  }, []);

  return (
    <div>
      <Course course={course} />
      <ChatPopup summary={course?.summary} videoQuery={course?.videoQuery} />
    </div>
  );
};

export default page;
