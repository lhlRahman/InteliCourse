import { useData } from "@/context/DataContext";
import axios from "axios";
import { useState, useRef } from "react";
import { FaCirclePlay } from "react-icons/fa6";

export default function Course({ course = { units: [] } }) {
  const [selected, setSelected] = useState({ unit: 0, chapter: 0 });
  const { addAlert } = useData();
  const [summaryAudio, setSummaryAudio] = useState(null);
  const [summaryAudioToggle, setSummaryAudioToggle] = useState(false);
  const [questionAudio, setQuestionAudio] = useState(null);
  const [questionAudioToggle, setQuestionAudioToggle] = useState(false);

  const summaryRef = useRef(null);
  const questionRef = useRef(null);

  const handleSelect = async (unit, chapter) => {
    setSelected({ unit, chapter });
    const summary = await textToSpeech(
      course.units[unit]?.chapters[chapter]?.summary
    );
    const questions = await textToSpeech(
      course.units[unit]?.chapters[chapter]?.questions
        .map(({ question, options }) => question + options.join(" "))
        .join(" ")
    );
    setSummaryAudio(summary);
    console.log(questions);
    setQuestionAudio(questions);
  };

  const textToSpeech = async (text) => {
    const res = await axios.post("/api/tts", { text }).then((res) => {
      if (res.data.status === 201) {
        return `data:audio/mpeg;base64,${res.data.data}`;
      } else {
        addAlert({
          message: res.data.message,
          type: "error",
        });
        return null;
      }
    });
    return res;
  };

  const completeCourse = (id) => {
    axios
      .post("/api/courses/complete", { courseId: id })
      .then((res) => {
        if (res.data.status === 201) {
          addAlert({
            message: "Course completed successfully",
            type: "success",
          });
          window.location.replace("/dashboard/courses/completed");
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

  return (
    <div className="flex h-full">
      <aside className="w-60 bg-[#292929] p-5 text-white">
        <nav>
          {course.units.map((unit, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-lg font-semibold mb-4">
                Unit {idx + 1} - {unit.name}
              </h2>
              <ul>
                {unit.chapters.map((chapter, idx1) => (
                  <li
                    key={`${idx}-${idx1}`}
                    className={`mb-2 py-2 px-4 rounded-md cursor-pointer transition-all hover:bg-gray-700 ${
                      idx === selected.unit && idx1 == selected.chapter
                        ? "font-bold bg-gray-700"
                        : ""
                    }`}
                    onClick={() => handleSelect(idx, idx1)}
                  >
                    {chapter.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-[#1a1a1a] p-8 text-white">
        <div className="mt-32">
          <h1 className="text-3xl font-bold mb-4">
            UNIT {selected.unit + 1} - CHAPTER {selected.chapter + 1}
          </h1>
          <h2 className="text-2xl font-semibold">
            {course.units[selected.unit]?.chapters[selected.chapter]?.name}
          </h2>
        </div>
        <div className="flex mb-10">
          <div className="flex-1 mr-8">
            <div className="mb-5"></div>
            <div className="flex items-center mb-4 gap-2">
              <h3 className="text-xl font-semibold ">Summary</h3>
              {summaryAudio && (
                <FaCirclePlay
                  className="cursor-pointer"
                  onClick={() => {
                    setSummaryAudioToggle(!summaryAudioToggle);
                    if (summaryAudioToggle) summaryRef.current.pause();
                    else summaryRef.current.play();
                  }}
                />
              )}
            </div>
            <p className="text-lg">
              {course.units[selected.unit]?.chapters[selected.chapter]?.summary}
            </p>
            {summaryAudio && (
              <audio
                ref={summaryRef}
                controls
                src={summaryAudio}
                style={{ display: "none" }}
              >
                Your browser does not support the audio element.
              </audio>
            )}
            {questionAudio && (
              <audio
                ref={questionRef}
                controls
                src={questionAudio}
                style={{ display: "none" }}
              >
                Your browser does not support the audio element.
              </audio>
            )}
            <div>
              <iframe
                className="w-full h-96 mt-8"
                src={`https://www.youtube.com/embed/${
                  course.units[selected.unit]?.chapters[selected.chapter]
                    ?.videoId
                }`}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="w-96">
            <div className="flex items-center mb-4 gap-2">
              <h3 className="text-xl font-semibold">Concept Check</h3>
              {questionAudio && (
                <FaCirclePlay
                  className="cursor-pointer"
                  onClick={() => {
                    setQuestionAudioToggle(!questionAudioToggle);
                    if (questionAudioToggle) questionRef.current.pause();
                    else questionRef.current.play();
                  }}
                />
              )}
            </div>
            {course.units[selected.unit]?.chapters[
              selected.chapter
            ]?.questions.map(({ question, options }, questionIndex) => (
              <div key={question} className="mb-6">
                <h4 className="font-semibold mb-4 text-lg">{question}</h4>
                {options.map((option, optionIndex) => (
                  <div key={option} className="mb-4">
                    <label className="flex items-center">
                      <input
                        className="mr-4"
                        id={`option${
                          questionIndex * options.length + optionIndex + 1
                        }`}
                        name={`question${questionIndex + 1}`}
                        type="radio"
                      />
                      <span>{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-[#2a2a2a] transition-all hover:bg-gray-700 px-6 py-3 rounded-md text-lg font-semibold"
            onClick={() => {
              if (selected.chapter === 0 && selected.unit === 0) return;
              if (selected.chapter === 0)
                setSelected({
                  unit: selected.unit - 1,
                  chapter: course.units[selected.unit - 1].chapters.length - 1,
                });
              else {
                setSelected({
                  unit: selected.unit,
                  chapter: selected.chapter - 1,
                });
              }
            }}
          >
            Previous
          </button>
          <button
            className="bg-[#2a2a2a] transition-all hover:bg-gray-700  px-6 py-3 rounded-md text-lg font-semibold"
            onClick={() => {
              if (
                selected.chapter ===
                  course.units[selected.unit].chapters.length - 1 &&
                selected.unit === course.units.length - 1
              ) {
                completeCourse(course.id);
                return;
              }
              if (
                selected.chapter ===
                course.units[selected.unit]?.chapters.length - 1
              )
                setSelected({ unit: selected.unit + 1, chapter: 0 });
              else
                setSelected({
                  unit: selected.unit,
                  chapter: selected.chapter + 1,
                });
            }}
          >
            {selected.chapter ===
              course.units[selected.unit]?.chapters.length - 1 &&
            selected.unit === course.units.length - 1
              ? "Finish"
              : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
}
