// /api/chapter/getInto

import { PrismaClient } from "@prisma/client";
import { strict_output } from "@/lib/gpt";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from "@/lib/youtube";

export default async function getChapterInfo(chapterId) {
  const prisma = new PrismaClient();

  if (!chapterId) throw new Error("Chapter ID is required");

  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      throw new Error("Chapter not found");
    }

    const videoId = await searchYoutube(chapter.videoQuery);
    let transcript = await getTranscript(videoId);
    let maxLength = 500;
    transcript = transcript.split(" ").slice(0, maxLength).join(" ");
    const { summary } = await strict_output(
      "You are an AI capable of summarising a youtube transcript",
      "summarise in 250 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about.\n" +
        transcript,
      { summary: "summary of the transcript" }
    );

    const questions = await getQuestionsFromTranscript(
      transcript,
      chapter.name
    );

    await prisma.question.createMany({
      data: questions.map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          chapterId: chapterId,
        };
      }),
    });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        videoId: videoId,
        summary: summary,
      },
    });

    return true;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
