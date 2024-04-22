import { FaGithub } from "react-icons/fa6";

export default function Contact() {
  return (
    <div
      style={{ paddingTop: "10rem" }}
      className="w-full h-screen dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center"
    >
      <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col items-center">
        {/* Header Section with GitHub Logo */}
        <div className="flex items-center justify-center">
          <p className="text-4xl sm:text-7xl text-center font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            About InteliCourse
          </p>
          <a href="https://github.com/lhlRahman/IncluSphere" target="_blank">
            <FaGithub className="w-24 h-24 inline-block ml-4" />
          </a>
        </div>
        {/* Concise About Section */}
        <div className="text-base sm:text-lg text-justify max-w-4xl mx-auto p-8 bg-white dark:bg-black rounded-lg shadow-md">
          <p className="pb-5">
            <strong>GenAI Hacks 2024:</strong> 
            InteliCourse was a submission to the GenAI hackathon hosted at the University of Toronto.
            It was created by a team of two freshmen, with the goal of making education more accessible to all.
          </p>

          <p className="pb-5">
            <strong>Technology Stack:</strong> NextJs, React, PostgreSQL, Prisma
            ORM, TailwindCSS, Scss, Framer Motion, Clerk, and Cohere AI, GPT 4, Gemini. Focused
            on intuitive design and semantic search for personalized matches.
          </p>
        </div>
      </div>
    </div>
  );
}