import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "./gpt";

export async function searchYoutube(searchQuery) {
  searchQuery = encodeURIComponent(searchQuery);
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`
  );
  if (!data) {
    console.log("youtube fail");
    return null;
  }
  if (data.items[0] == undefined) {
    console.log("youtube fail");
    return null;
  }
  let i = 0;
  while (i < data.items.length) {
    let videoId = data.items[i].id.videoId;
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId);
    if (transcript_arr[0].text != "I would you take caution in this video") {
      return videoId;
    }
    i++;
  }
  return "";
}

export async function getTranscript(videoId) {
  try {
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoId);
    let transcript = "";
    for (let t of transcript_arr) {
      transcript += t.text + " ";
    }
    return transcript.replaceAll("\n", "");
  } catch (error) {
    console.log("transcript error", error);
    return "";
  }
}

export async function getQuestionsFromTranscript(transcript, course_title) {
  const questions = await strict_output(
    "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words",
    new Array(5).fill(
      `You are to generate a random hard mcq question about ${course_title} with context of the following transcript: ${transcript}`
    ),
    {
      question: "question",
      answer: "answer with max length of 15 words",
      option1: "option1 with max length of 15 words",
      option2: "option2 with max length of 15 words",
      option3: "option3 with max length of 15 words",
    }
  );
  return questions;
}
