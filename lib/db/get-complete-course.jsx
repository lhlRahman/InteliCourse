import { PrismaClient } from "@prisma/client";
export const fetchCache = "force-no-store";

export default async function getCompleteCourse(userId) {
  const prisma = new PrismaClient();

  try {
    const courses = await prisma.course.findMany({
      where: {
        creatorId: userId,
        completed: true,
      },
    });

    return courses;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
