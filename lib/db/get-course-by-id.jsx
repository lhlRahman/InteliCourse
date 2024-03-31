import { PrismaClient } from "@prisma/client";
export const fetchCache = "force-no-store";

export default async function getCourseById(courseId) {
  const prisma = new PrismaClient();

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        units: {
          include: {
            chapters: true,
          },
        },
      },
    });

    return course;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
