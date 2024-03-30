"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [clerkId, setClerkId] = useState("");
  const [user, setUser] = useState({});
  const [sidebarShow, setSidebarShow] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("Dashboard");
  const [showModal, setShowModal] = useState(false);
  const { userId } = useAuth();
  const [alerts, setAlerts] = useState([]);

  const addAlert = ({ message, type, time = 3000 }) => {
    let tmp = [...alerts];
    message = message.toString();
    tmp.push({
      message,
      type,
      time,
    });
    setAlerts(tmp);
  };

  let userFetched = false;
  useEffect(() => {
    setClerkId(userId);
    if (!userFetched) {
      axios
        .get(`/api/users/getclerk/${userId}`)
        .then((res) => {
          console.log(res.data.data);
          setUser(res.data.data);
        })
        .catch((err) => {});
      userFetched = true;
    }
  }, [userId]);

  return (
    <DataContext.Provider
      value={{
        clerkId,
        setClerkId,
        setSidebarShow,
        sidebarShow,
        activeSidebar,
        setActiveSidebar,
        showModal,
        setShowModal,
        user,
        setUser,
        addAlert,
        alerts,
        setAlerts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
