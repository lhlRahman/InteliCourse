"use client";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/ui/SidebarItem";
import { MdVolunteerActivism } from "react-icons/md";
import { useData } from "../../context/DataContext";
import { FaPlus } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

export default function RootLayout({ children }) {
  const { user } = useData();

  return (
    <>
      <Sidebar show={false}>
        <SidebarItem
          title="Create a Course"
          icon="/icons/dashboardIconDark.svg"
          Icon={MdVolunteerActivism}
          link="/dashboard/courses/create"
        />
        <SidebarItem
          title="All Courses"
          icon="/icons/dashboardIconDark.svg"
          Icon={MdVolunteerActivism}
          link="/dashboard/courses"
        />
        <SidebarItem
          title="Current Courses"
          icon="/icons/dashboardIconDark.svg"
          Icon={MdVolunteerActivism}
          link="/dashboard/courses/current"
        />
        <SidebarItem
          title="Completed Courses"
          icon="/icons/dashboardIconDark.svg"
          Icon={MdVolunteerActivism}
          link="/dashboard/courses/completed"
        />
      </Sidebar>
      {children}
    </>
  );
}
