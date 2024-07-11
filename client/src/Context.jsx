import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const printElem = useRef();
  const toast = useToast();
  const [theme, setTheme] = useState("purple.400");
  const [about, setAbout] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    picture: "",
  });

  const [educationList, setEducationList] = useState([
    {
      id: "",
      degree: "",
      school: "",
      startYr: 0,
      endYr: 0,
      grade: "",
    },
  ]);

  const [skills, setSkills] = useState([]);

  const [workList, setWorkList] = useState([
    {
      id: "",
      position: "",
      company: "",
      type: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: "",
      name: "",
      description: "",
      url: "",
    },
  ]);

  const [resumePreview, setResumePreview] = useState(null);

  useEffect(() => {
    const storedAbout = JSON.parse(localStorage.getItem("about"));
    if (storedAbout) {
      setAbout(storedAbout);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("about", JSON.stringify(about));
  }, [about]);

  const saveResumePreview = (data) => {
    setResumePreview(data);
  };

  const value = {
    about,
    setAbout,
    educationList,
    setEducationList,
    skills,
    setSkills,
    workList,
    setWorkList,
    projects,
    setProjects,
    printElem,
    theme,
    setTheme,
    saveResumePreview,
    resumePreview,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};
