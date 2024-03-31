import { PrismaClient } from "@prisma/client";
export const fetchCache = "force-no-store";

export default async function completeCourse(courseId) {
  const prisma = new PrismaClient();

  try {
    const courses = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
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
