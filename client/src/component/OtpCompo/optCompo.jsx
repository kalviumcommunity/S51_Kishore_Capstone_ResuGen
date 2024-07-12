import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../HeaderComponent/Header";
import { toast, ToastContainer } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
  Spinner,
  Center
} from "@chakra-ui/react";

const OtpCompo = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.userEmail || "";
  const toast = useToast();

  useEffect(() => {
    // Show toast message when the component mounts
    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to your email address: ${userEmail}`,
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top-right",
      colorScheme: "cyan"
    });
  }, [toast, userEmail]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input
      if (value !== "" && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Automatically move to the previous input
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://s51-kishore-capstone-resume-builder.onrender.com/verify-otp", {
        userEmail,
        otp: otp.join(""),
      });
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Email verified successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Box
        maxW="md"
        mx="auto"
        mt="20"
        p="8"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading as="h2" size="xl" textAlign="center" mb="4" color="#013564">
          OTP Verification
        </Heading>
        <Center mb={4} color="#013564">
          <pre>An OTP has been sent to your email</pre>
        </Center>
        <form onSubmit={handleSubmit}>
          <Stack spacing="6">
            <FormControl id="otp" isRequired>
              <FormLabel>Enter OTP</FormLabel>
              <HStack justify="center" spacing="4">
                {otp.map((_, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    textAlign="center"
                    fontSize="2xl"
                    width="3rem"
                    height="3rem"
                  />
                ))}
              </HStack>
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={loading}
              loadingText="Verifying"
              spinnerPlacement="start"
            >
              Verify OTP
            </Button>
          </Stack>
        </form>
      </Box>
      <ToastContainer />
    </>
  );
};

export default OtpCompo;
