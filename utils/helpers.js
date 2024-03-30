import { IoMdDoneAll } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";

export const createItemUser = ({
  id,
  title,
  description,
  location,
  categories,
  imageUrl,
  startDate,
  endDate,
  createdAt,
  updatedAt,
  acceptedApplicants,
  neededApplicants,
  requiredHours,
  posterId,
  completed,
  poster,
  applications,
}) => {
  return {
    title: title,
    description: description,
    header: <Skeleton image={imageUrl} />,
    link: "/dashboard/jobs/" + id,
    completed: completed,
    neededApplicants: neededApplicants,
    acceptedApplicants: acceptedApplicants,
    data: {
      id,
      title,
      description,
      location,
      categories,
      imageUrl,
      startDate,
      endDate,
      createdAt,
      updatedAt,
      acceptedApplicants,
      neededApplicants,
      requiredHours,
      posterId,
      completed,
      poster,
      applications,
    },
  };
};

export const createItemPoster = ({
  id,
  title,
  description,
  location,
  categories,
  imageUrl,
  startDate,
  endDate,
  createdAt,
  updatedAt,
  acceptedApplicants,
  neededApplicants,
  requiredHours,
  posterId,
  completed,
  poster,
  applications,
}) => {
  return {
    title: title,
    description: description,
    header: <Skeleton image={imageUrl} />,
    icon: completed ? (
      <CompletedIcon green={true} />
    ) : (
      <OnGoingIcon blue={true} />
    ),
    link: "/dashboard/jobs/" + id,
    completed: completed,
    data: {
      id,
      title,
      description,
      location,
      categories,
      imageUrl,
      startDate,
      endDate,
      createdAt,
      updatedAt,
      acceptedApplicants,
      neededApplicants,
      requiredHours,
      posterId,
      completed,
      poster,
      applications,
    },
  };
};

export const CompletedIcon = ({ green = false }) => {
  return <IoMdDoneAll style={{ color: green ? "green" : "" }} />;
};

export const OnGoingIcon = ({ blue = false }) => {
  return <AiOutlineLoading3Quarters className={`${blue && "text-blue-500"}`} />;
};

const Skeleton = ({ image }) => (
  <div className="relative w-full h-full min-h-[6rem] overflow-hidden rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    {image && (
      <img src={image} alt="" className="absolute w-full h-full object-cover" />
    )}
  </div>
);

export const isUserPoster = (user) => {
  return user && user.type == 2;
};

export const genetatePrompt = ({
  description = undefined,
  bio = undefined,
}) => {
  if (bio && description) {
    return `Given a userBio (in which a person describes activities and experiences they enjoy doing and what particular aspects they they’ve excelled at) and a job description (which is from a volunteer posting), write a note from the perspective of the user to the volunteer poster that demonstrates their good a candidate for the position. It should include points like why they’re excited about the opportunity and why they fit the role. Only generate and return the note from the user perspective. Do not include any other words describing what you have generated:
    userBio: ${bio}
    jobDescription: ${description}`;
  }
  if (description) {
    return `Given a brief initial volunteering opportunity description and form values, transform it to be more engaging and friendly, suitable for high school students.  Given the description, add a list of skills as well. These skills should be general skills that a student can use in other jobs, like communication, customer service, public speaking, independent problem solving, creativity, etc). Only generate and return the made volunteer description. Do not include any other words describing what you have generated:${description}`;
  }
  return "";
};

export const rerank = async (arr, query) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
  };

  const data = {
    model: "rerank-english-v2.0",
    query: query,
    documents: arr,
  };
  return await axios
    .post("https://api.cohere.ai/v1/rerank", data, { headers })
    .then((res) => {
      return { success: true, results: res.data.results };
    })
    .catch((err) => {
      console.log(err);
      return { success: false, text: err };
    });
};

export const autoCompleteAPI = async (prompt) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
  };

  const data = {
    prompt: prompt,
  };

  return await axios
    .post("https://api.cohere.ai/v1/generate", data, { headers })
    .then((res) => {
      return { success: true, text: res.data.generations[0].text };
    })
    .catch((err) => {
      return { success: false, text: err };
    });
};

export const clampText = (text, max) => {
  if (max < 3) return text;
  if (text.length > max) {
    return text.substring(0, max - 3) + "...";
  }
  return text;
};
