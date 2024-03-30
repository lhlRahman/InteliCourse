import { PrismaClient } from "@prisma/client";

export default async function GetUserByClerkId(clerkId) {
  const prisma = new PrismaClient();

  if (!clerkId) throw new Error("Invalid clerk id");

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    });

    // if (user) {
    //   if (user.type === 2) {
    //     const jobs = await prisma.job.findMany({
    //       where: {
    //         posterId: user.id,
    //       },
    //     });
    //     user.postedJobs = jobs;
    //   } else {
    //     const applications = await prisma.application.findMany({
    //       where: {
    //         applicantId: user.id,
    //       },
    //     });
    //     user.appliedJobs = applications;
    //   }
    // }

    return user;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
