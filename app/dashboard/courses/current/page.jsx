"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/AllCourses.module.scss";
import CoursesTable from "../../../..//components/ui/CoursesTable";
import {
  CompletedIcon,
  OnGoingIcon,
  createItemPoster,
  isUserPoster,
} from "../../../../utils/helpers";
import { useData } from "../../../../context/DataContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
export const dynamic = "force-dynamic";

export default function CurrentCourses() {
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState([]);
  const { user, addAlert } = useData();
  const [loading, setLoading] = useState(false);

  const addFilter = (filter) => {
    setFilters([...filters, filter]);
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const fetchCourses = async () => {
    axios
      .post("/api/courses/getCurrent", { userId: user.id })
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
          setFilteredItems(data.data.map(createItemPoster));
        }
      })
      .catch((err) => {
        console.log(err);
        setOriginalItems([]);
      });
  };

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
