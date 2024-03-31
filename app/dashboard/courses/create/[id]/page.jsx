"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useData } from "@/context/DataContext";
import MultiStepLoader from "@/components/MultiStepLoad";

export default function CreateChapter() {
  const [course, setCourse] = useState({ title: "", units: [] });
  // get the id from the url
  const { id } = useParams();
  const { addAlert } = useData();
  const [chatperNames, setChapterNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const getCourseById = async () => {
    axios
      .post(`/api/courses/getById/${id}`)
      .then((res) => {
        if (res.data.status === 201) {
          addAlert({
            message: "Course retrieved successfully",
            type: "success",
          });
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

  useEffect(() => {
    if (loadedCount === chatperNames.length) {
      setLoading(false);
    }
  }, [loadedCount]);

  const getAllChaptersInfo = async () => {
    setLoadedCount(0);
    setLoading(true);
    let names = [];
    let ids = [];
    // loop through all chapters and get info
    course.units.forEach(async (unit) => {
      unit.chapters.forEach(async (chapter) => {
        names.push({ text: chapter.name });
        ids.push(chapter.id);
      });
    });

    setChapterNames(names);

    let success = true;

    for (let i = 0; i < ids.length; i++) {
      if (!(await getChapterInfo(ids[i]))) {
        setLoading(false);
        addAlert({
          message: "Failed to generate chapters",
          type: "error",
        });
        success = false;
        break;
      }
      setLoadedCount((prev) => prev + 1);
    }
    if (success) {
      addAlert({
        message: "Chapters generated successfully",
        type: "success",
      });
      window.location.replace("/course/" + id);
    }
  };

  const getChapterInfo = async (chapterId) => {
    return await axios
      .post(`/api/chapters/generate`, {
        chapterId: chapterId,
      })
      .then((res) => {
        if (res.data.status === 201) {
          console.log(res.data.data);
          return true;
        } else {
          console.log(res.data.message);
          addAlert({
            message: res.data.message,
            type: "error",
          });
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  let retrievedChapters = false;
  useEffect(() => {
    if (id && !retrievedChapters) {
      retrievedChapters = true;
      getCourseById();
      console.log("Retrieved chapters", id);
    }
  }, []);

  return (
    <div className="bg-[#1a1a1a] min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-32">
      {loading && (
        <MultiStepLoader
          loading={loading}
          setLoading={setLoading}
          loadingStates={chatperNames}
          currentState={loadedCount}
          setCurrentState={setLoadedCount}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">{course.title}</h1>
        <div className="bg-[#333333] p-6 rounded-lg mb-6">
          <div className="flex items-center text-white mb-4">
            <CircleIcon className="h-6 w-6 text-blue-500 mr-2" />
            <p className="text-sm">
              We generated chapters for each of your units. Look over them and
              then click the "Finish Course Generation" button to confirm and
              continue.
            </p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              getAllChaptersInfo();
            }}
          >
            Finish Course Generation
          </Button>
        </div>
        <div className="space-y-6">
          {course.units.map((unit, index) => {
            return (
              <div key={index}>
                <h2 className="text-2xl font-bold text-white mb-4">
                  UNIT {index + 1}
                </h2>
                <h3 className="text-xl text-white mb-2">{unit.name}</h3>
                <div className="bg-[#252525] p-4 rounded-lg space-y-2">
                  {unit.chapters.map((chapter, idx) => {
                    return (
                      <p key={`${index}-${idx}`} className="text-white">
                        Chapter {idx + 1} {chapter.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
