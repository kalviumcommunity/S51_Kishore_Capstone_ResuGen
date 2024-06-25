import {
  Box,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  UnorderedList,
  ListItem,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import About from "../UserInputs/PersonalDetails/About";
import Education from "../UserInputs/Education/Education";
import Projects from "../UserInputs/UserAdditional/Projects";
import Skills from "../UserInputs/Skills/Skills";
import Work from "../UserInputs/Experience/Work";

const Builder = () => {
  const [modalHeading, setModalHeading] = useState("");
  const [modalMessage, setModalMessage] = useState([]);
  const [remainingTime, setRemainingTime] = useState(4); 
  const modalDisclosure = useDisclosure();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    if (modalDisclosure.isOpen) {
      setRemainingTime(4); 
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            setTimeout(() => modalDisclosure.onClose(), 100); 
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [modalDisclosure.isOpen]);

  const handleTabChange = (index) => {
    setSelectedTabIndex(index);

    switch (index) {
      case 1:
        setModalHeading("🎉Great job! Up next, your educational milestones.");
        setModalMessage([
          "Feature degrees, certifications or licenses, and training related to your industry.",
          "Recent graduates: highlight academic projects, awards, and coursework.",
        ]);
        modalDisclosure.onOpen();
        break;
      case 2:
        setModalHeading(
          "🎉Excellent progress! Now, let's highlight your key skills."
        );
        setModalMessage([
          "Incorporate keywords from job descriptions so employers and applicant tracking systems can scan your resume.",
          "Highlight a mix of hard skills like programming and soft skills like team management.",
        ]);
        modalDisclosure.onOpen();
        break;
      case 3:
        setModalHeading(
          "🎉Looking good! Let's tackle your professional experience."
        );
        setModalMessage([
          "Quantify your professional achievements with numbers and data.",
          "Reframe routine job responsibilities as accomplishments.",
        ]);
        modalDisclosure.onOpen();
        break;
      case 4:
        setModalHeading("📝 Looks Fantastic! Let's move on to your projects");
        setModalMessage([
          "Give projects that showcase your expertise",
          "Provide a brief description of your projects.",
        ]);
        modalDisclosure.onOpen();
        break;
      default:
        modalDisclosure.onClose();
        break;
    }
  };

  return (
    <Box bg="white" w="full" maxW="xl" rounded="md" shadow="md" overflow="hidden" p={4}>
      <Tabs isFitted variant="enclosed" onChange={handleTabChange}>
        <TabList>
          <Tab>
            <Text fontWeight="medium">About</Text>
          </Tab>
          <Tab>
            <Text fontWeight="medium">Education</Text>
          </Tab>
          <Tab>
            <Text fontWeight="medium">Skills</Text>
          </Tab>
          <Tab>
            <Text fontWeight="medium">Work</Text>
          </Tab>
          <Tab>
            <Text fontWeight="medium">Projects</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <About />
          </TabPanel>
          <TabPanel>
            <Education />
          </TabPanel>
          <TabPanel>
            <Skills />
          </TabPanel>
          <TabPanel>
            <Work />
          </TabPanel>
          <TabPanel>
            <Projects />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={modalDisclosure.isOpen} onClose={modalDisclosure.onClose} isCentered>
        <ModalOverlay />
        <ModalContent pt="60px"> 
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", top: "10px", left: "10px", display: 'flex', alignItems: 'center' }}
          >
            <CircularProgress
              value={((4 - remainingTime) / 4) * 100} // Adjusted calculation for progress value
              size="50px"
              color="green.400"
              thickness="8px"
              mr={3}
            >
              <CircularProgressLabel>{remainingTime}</CircularProgressLabel>
            </CircularProgress>
          </motion.div>
          <ModalHeader fontSize={"2xl"}>{modalHeading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              {modalMessage.map((message, index) => (
                <ListItem bg={"gray.100"} fontSize={"large"} p={2} key={index}>{message}</ListItem>
              ))}
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={modalDisclosure.onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Builder;
