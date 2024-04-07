"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/AllCourses.module.scss";
import CoursesTable from "@/components/ui/CoursesTable";
import {
  CompletedIcon,
  OnGoingIcon,
  createItemPoster,
  isUserPoster,
  rerank,
} from "../../../utils/helpers";
import { useData } from "@/context/DataContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import axios from "axios";
export const dynamic = "force-dynamic";

export default function AllCourses() {
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState([]);
  const { user, addAlert } = useData();
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);


  const onToggle = (e) => {
    setToggle(e.target.checked);
    if (e.target.checked) {
      sortBasedOnRerank();
    } else {
      setFilteredItems(originalItems);
    }
  };

  const addFilter = (filter) => {
    setFilters([...filters, filter]);
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const fetchCourses = async () => {
    axios
      .get("/api/courses/getAll")
      .then((response) => {
        const data = response.data;
        if (data.status != 201) {
          addAlert({
            message:
              "There was an error fetching courses. Please reload the page.",
            type: "error",
          });
          setOriginalItems([]);
        } else {
          setOriginalItems(data.data.map(createItemPoster));
        }
      })
      .catch((err) => {
        console.log(err);
        setOriginalItems([]);
      });
  };

  const sortBasedOnRerank = async () => {
    if (isUserPoster(user)) return;
    setLoading(true);
    const response = await rerank(
      originalItems.map((each) => each.description),
      user.bio
    );
    if (response.success === false) {
      setLoading(false);
      return;
    }
    let copy = [...originalItems];

    copy.forEach((obj, idx) => {
      obj["newSortIndex"] = response.results[idx].index;
    });

    copy = copy.sort((a, b) => a.newSortIndex - b.newSortIndex);

    copy.forEach((item) => delete item.newSortIndex);

    setFilteredItems(copy);
    setLoading(false);
  };

  useEffect(() => {

    if (originalItems.length > 0 && user && user.bio && user.bio !== "") {
      sortBasedOnRerank();
    }
  }, [originalItems, user]);

  let coursesFetched = false;
  useEffect(() => {
    document.title = " | All Courses";
    if (!coursesFetched) {
      fetchCourses();
      coursesFetched = true;
    }
  }, [user]);

  return (
    <main id={styles.courses}>
      <div className={styles.toggleWrapper}>
        <label className="inline-flex cursor-pointer" style={{ gap: "1rem" }}>
          <input
            type="checkbox"
            value=""
            onChange={onToggle}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

          <span
            className={`${styles.information} flex items-center text-xs italic font-light text-gray-300`}
          >
            <IoMdInformationCircleOutline />

            <span>Personalized Courses</span>
          </span>
        </label>
      </div>

      <div>
        {loading && (
          <div className="flex items-center gap-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-green-200 rounded">
            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
            <p>
              Personalizing your Courses feed based on your bio and resume...
            </p>
          </div>
        )}

        {!loading && (
          <div className={styles.wrapper}>
            <div
              className={styles.filters}
              style={{ display: isUserPoster(user) ? "flex" : "none" }}
            >
              <div
                className={`${styles.filter} ${
                  filters.includes("completed") && styles.active
                }`}
                onClick={() => {
                  if (filters.includes("completed")) {
                    removeFilter("completed");
                  } else {
                    addFilter("completed");
                  }
                }}
              >
                <CompletedIcon />
                <div className={styles.title}>Completed</div>
              </div>
              <div
                className={`${styles.filter} ${
                  filters.includes("ongoing") && styles.active
                }`}
                onClick={() => {
                  if (filters.includes("ongoing")) {
                    removeFilter("ongoing");
                  } else {
                    addFilter("ongoing");
                  }
                }}
              >
                <OnGoingIcon />
                <div className={styles.title}>Ongoing</div>
              </div>
            </div>
            {filteredItems.length === 0 && (
              <div className="mt-5 text-center text-gray-300">
                No Courses Found
              </div>
            )}
            <CoursesTable items={filteredItems} />
          </div>
        )}
      </div>
    </main>
  );
}
