import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useResume } from "../../../Context";
import { useToast } from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";

// List of potential skills
const potentialSkills = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "ExpressJS", label: "ExpressJS" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "CSS", label: "CSS" },
  { value: "HTML", label: "HTML" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Ruby", label: "Ruby" },
  { value: "PHP", label: "PHP" },
  { value: "C#", label: "C#" },
  { value: "C++", label: "C++" },
  { value: "Go", label: "Go" },
  { value: "Swift", label: "Swift" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "SQL", label: "SQL" },
  { value: "NoSQL", label: "NoSQL" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "MySQL", label: "MySQL" },
  { value: "GraphQL", label: "GraphQL" },
  { value: "REST API", label: "REST API" },
  { value: "Docker", label: "Docker" },
  { value: "Kubernetes", label: "Kubernetes" },
  { value: "AWS", label: "AWS" },
  { value: "Azure", label: "Azure" },
  { value: "Google Cloud", label: "Google Cloud" },
  { value: "Linux", label: "Linux" },
  { value: "Git", label: "Git" },
  { value: "Agile", label: "Agile" },
  { value: "Scrum", label: "Scrum" },
  { value: "Jenkins", label: "Jenkins" },
  { value: "CI/CD", label: "CI/CD" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Deep Learning", label: "Deep Learning" },
  { value: "Data Science", label: "Data Science" },
  { value: "Data Analysis", label: "Data Analysis" },
  { value: "Big Data", label: "Big Data" },
  { value: "Hadoop", label: "Hadoop" },
  { value: "Spark", label: "Spark" },
  { value: "TensorFlow", label: "TensorFlow" },
  { value: "PyTorch", label: "PyTorch" },
  {
    value: "Natural Language Processing",
    label: "Natural Language Processing",
  },
  { value: "Computer Vision", label: "Computer Vision" },
  { value: "DevOps", label: "DevOps" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Penetration Testing", label: "Penetration Testing" },
  { value: "Network Security", label: "Network Security" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Ethereum", label: "Ethereum" },
  { value: "Smart Contracts", label: "Smart Contracts" },
  { value: "Solidity", label: "Solidity" },
  { value: "IoT", label: "IoT" },
  { value: "Embedded Systems", label: "Embedded Systems" },
  { value: "AR/VR", label: "AR/VR" },
  { value: "Unity", label: "Unity" },
  { value: "Unreal Engine", label: "Unreal Engine" },
  { value: "Game Development", label: "Game Development" },
  { value: "Project Management", label: "Project Management" },
  { value: "Team Leadership", label: "Team Leadership" },
  { value: "Communication", label: "Communication" },
  { value: "Problem Solving", label: "Problem Solving" },
  { value: "Critical Thinking", label: "Critical Thinking" },
  { value: "Creativity", label: "Creativity" },
  { value: "Time Management", label: "Time Management" },
  { value: "Adaptability", label: "Adaptability" },
  { value: "SQL Server", label: "SQL Server" },
  { value: "Oracle", label: "Oracle" },
  { value: "Salesforce", label: "Salesforce" },
  { value: "CRM", label: "CRM" },
  { value: "SAP", label: "SAP" },
  { value: "ERP", label: "ERP" },
  { value: "Figma", label: "Figma" },
  { value: "Adobe XD", label: "Adobe XD" },
  { value: "Sketch", label: "Sketch" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Wireframing", label: "Wireframing" },
  { value: "Prototyping", label: "Prototyping" },
  { value: "Usability Testing", label: "Usability Testing" },
  { value: "Responsive Design", label: "Responsive Design" },
  { value: "Graphic Design", label: "Graphic Design" },
  { value: "Illustrator", label: "Illustrator" },
  { value: "Photoshop", label: "Photoshop" },
  { value: "InDesign", label: "InDesign" },
  { value: "SEO", label: "SEO" },
  { value: "Content Marketing", label: "Content Marketing" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Social Media Marketing", label: "Social Media Marketing" },
  { value: "Email Marketing", label: "Email Marketing" },
  { value: "Copywriting", label: "Copywriting" },
  { value: "Branding", label: "Branding" },
  { value: "Public Speaking", label: "Public Speaking" },
  { value: "Event Planning", label: "Event Planning" },
  { value: "Customer Service", label: "Customer Service" },
  { value: "Technical Support", label: "Technical Support" },
  { value: "Business Analysis", label: "Business Analysis" },
  { value: "Financial Analysis", label: "Financial Analysis" },
  { value: "Accounting", label: "Accounting" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Recruitment", label: "Recruitment" },
  { value: "Training and Development", label: "Training and Development" },
  { value: "Conflict Resolution", label: "Conflict Resolution" },
];

// Custom styles to remove the dropdown arrow
const customStyles = {
  indicatorsContainer: (provided) => ({
    ...provided,
    display: "none",
    cursor: "caret",
  }),
};

const Skills = () => {
  const toast = useToast();
  const { skills, setSkills } = useResume();
  const [skill, setSkill] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load skills from local storage
    const storedSkills = localStorage.getItem("skills");
    if (storedSkills) {
      setSkills(JSON.parse(storedSkills));
    }
  }, [setSkills]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!skill) {
      setError("Skill cannot be empty");
      return;
    }

    const trimmedSkill = skill.value.trim();

    if (
      skills.some((s) => s.name.toLowerCase() === trimmedSkill.toLowerCase())
    ) {
      setError("Skill already exists");
      return;
    }

    setError("");

    const newSkill = {
      id: uuidv4(),
      name: trimmedSkill,
    };
    setSkills([...skills, newSkill]);

    // Store skills in local storage
    localStorage.setItem("skills", JSON.stringify([...skills, newSkill]));
    setSkill(null);
  };

  const deleteSkill = (id) => {
    const updatedSkills = skills.filter((elem) => elem.id !== id);
    setSkills(updatedSkills);

    // Update skills in local storage after deletion
    localStorage.setItem("skills", JSON.stringify(updatedSkills));
  };

  return (
    <>
      <HStack
        spacing={4}
        alignItems={"flex-end"}
        as="form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormControl isInvalid={error}>
          <FormLabel htmlFor="skill">Add Skills</FormLabel>
          <CreatableSelect
            options={potentialSkills}
            value={skill}
            onChange={setSkill}
            placeholder="Select or type a skill"
            isClearable
            instanceId="skills-select"
            styles={customStyles}
          />
        </FormControl>
        <Button type="submit" colorScheme={"purple"}>
          Add
        </Button>
      </HStack>
      {error && (
        <Box mt={2} color="red.500">
          {error}
        </Box>
      )}

      <Box borderWidth={"1px"} rounded={"sm"} my={4} p={2}>
        {skills.length > 0
          ? skills.map((skill, index) => (
              <Tag
                size={"lg"}
                key={index}
                borderRadius="full"
                variant="solid"
                colorScheme="purple"
                m={0.5}
              >
                <TagLabel>{skill.name}</TagLabel>
                <TagCloseButton onClick={() => deleteSkill(skill.id)} />
              </Tag>
            ))
          : "No Skills Added"}
      </Box>
    </>
  );
};

export default Skills;
