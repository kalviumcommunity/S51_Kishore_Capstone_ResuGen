// resumeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  about: {
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    picture: "",
  },
  educationList: [
    {
      id: "",
      degree: "",
      school: "",
      startYr: 0,
      endYr: 0,
      grade: "",
    },
  ],
  skills: [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "ReactJS" },
    { id: 3, name: "NodeJS" },
    { id: 4, name: "MongoDB" },
    { id: 5, name: "ExpressJS" },
    { id: 6, name: "PHP" },
    { id: 7, name: ".Net" },
    { id: 8, name: "Java" },
    { id: 9, name: "RestAPI" },
    { id: 10, name: "jQuery" },
    { id: 11, name: "MySQL" },
    { id: 12, name: "Ajax" },
    { id: 13, name: "GitHub" },
    { id: 14, name: "HTML" },
    { id: 15, name: "CSS" },
    { id: 16, name: "TailwindCSS" },
    { id: 17, name: "Bootstrap" },
  ],
  workList: [
    {
      id: "",
      position: "",
      company: "",
      type: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  projects: [
    {
      id: "",
      name: "",
      description: "",
      url: "",
    },
  ],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    setEducationList: (state, action) => {
      state.educationList = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setWorkList: (state, action) => {
      state.workList = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { setAbout, setEducationList, setSkills, setWorkList, setProjects } = resumeSlice.actions;

export default resumeSlice.reducer;
