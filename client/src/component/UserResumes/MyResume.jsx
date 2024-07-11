import React, { useState, useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import "./MyResume.css";
import Logo from "../../assets/Logo.png";
import Header from "../HeaderComponent/Header";
import { Link } from "react-router-dom";

const MyResume = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef();

  useEffect(() => {
    const getLoggedInState = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        setUserLoggedIn(true);
      } else {
        setIsDialogOpen(true);
      }
    };

    getLoggedInState();
  }, []);

  const onClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Header />
      <div className="my-resume-main">
        {userLoggedIn ? (
          <div className="my-resume-div">
            <h1>My Resume</h1>
          </div>
        ) : (
          <AlertDialog
            isOpen={isDialogOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
            size="lg"
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Login Required
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  You need to be logged in to view your resumes.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Link to="/login">
                    <Button colorScheme="blue" onClick={onClose} ml={3}>
                      Login
                    </Button>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </div>
    </>
  );
};

export default MyResume;
