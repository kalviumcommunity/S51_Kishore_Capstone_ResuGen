import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useResume } from "../../../Context";
import { useToast } from "@chakra-ui/react";

const Skills = () => {
  const toast = useToast();
  const { skills, setSkills } = useResume();
  const [skill, setSkill] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedSkill = skill.trim();

    if (!trimmedSkill) {
      setError("Skill cannot be empty");
      return;
    }

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
    setSkill("");

    // Store skills in local storage
    localStorage.setItem("skills", JSON.stringify([...skills, newSkill]));
  };

  const deleteSkill = (id) => {
    setSkills(skills.filter((elem) => elem.id !== id));
    // Update skills in local storage after deletion
    localStorage.setItem(
      "skills",
      JSON.stringify(skills.filter((elem) => elem.id !== id))
    );
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
          <Input
            onChange={(e) => setSkill(e.target.value)}
            value={skill}
            name="skill"
            id="skill"
            type="text"
            variant="filled"
            placeholder="Skill"
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
