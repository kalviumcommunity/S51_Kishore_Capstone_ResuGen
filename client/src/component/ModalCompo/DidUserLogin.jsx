import React, { useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DidUserLogin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Modal isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login Required</ModalHeader>
          <ModalBody>
            <Text>You have to log in to continue.</Text>
          </ModalBody>
          <ModalFooter>
            <Link to="/">
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="blue">Log In</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DidUserLogin;
