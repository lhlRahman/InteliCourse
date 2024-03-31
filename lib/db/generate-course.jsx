import { PrismaClient } from "@prisma/client";
import { createChaptersSchema } from "../../utils/helpers";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";

export const fetchCache = "force-no-store";

export default async function generateCourse(userId, title, units) {
  const prisma = new PrismaClient();

  if (!userId) throw new Error("Unauthorized action.");

  try {
    const parsed = createChaptersSchema.parse({ title, units });
    title = parsed.title;
    units = parsed.units;

    let output_units = await strict_output(
      "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
      new Array(units.length).fill(
        `It is your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`
      ),
      {
        title: "title of the unit",
        chapters:
          "an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
      }
    );

    const imageSearchTerm = await strict_output(
      "you are an AI capable of finding the most relevant image for a course",
      `Please provide a good image search term for the title of a course about ${title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results`,
      {
        image_search_term: "a good search term for the title of the course",
      }
    );

    const description = await strict_output(
      "You are an AI capable of generating a course description",
      `Please provide a course description for a course about ${title}. This description should be concise and informative, providing a brief overview of what the course is about`,
      {
        description: "a course description",
      }
    );

    const course_image = await getUnsplashImage(
      imageSearchTerm.image_search_term
    );

    // console.log(title, course_image, output_units);

    const course = await prisma.course.create({
      data: {
        creatorId: userId,
        title,
        description: description.description,
        imageUrl: course_image,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
      },
    });

    for (const unit of output_units) {
      const title = unit.title;
      const prismaUnit = await prisma.unit.create({
        data: {
          courseId: course.id,
          name: title,
        },
      });

      for (const chapter of unit.chapters) {
        await prisma.chapter.create({
          data: {
            name: chapter.chapter_title,
            unitId: prismaUnit.id,
            videoQuery: chapter.youtube_search_query,
          },
        });
      }
    }

    return course.id;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
