import { PrismaClient } from "@prisma/client";
export const fetchCache = "force-no-store";

export default async function getAll() {
  const prisma = new PrismaClient();

  try {
    const courses = await prisma.course.findMany();

    return courses;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
