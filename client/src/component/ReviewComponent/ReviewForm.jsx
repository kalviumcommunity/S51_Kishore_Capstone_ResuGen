import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  HStack,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Header from "../HeaderComponent/Header";
import Rating from "react-rating";

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:6969/reviews", {
        name,
        comment,
        rating,
      });
      toast.success("Review submitted successfully");
      setName("");
      setComment("");
      setRating(0);
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <>
      <Header />
      <Box
        maxW="md"
        mx="auto"
        mt={10}
        p={5}
        borderWidth={1}
        borderRadius="lg"
        shadow="md"
      >
        <Heading as="h2" size="lg" mb={4} textAlign="center" color="#013564">
          Leave a Review
        </Heading>

        <Center mb={4} color="#013564">
          <pre>
            Share your valuable experience with us!!
          </pre>
        </Center>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="comment" isRequired>
              <FormLabel>Comment</FormLabel>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FormControl>
            <FormControl id="rating" isRequired>
              <FormLabel>Rating</FormLabel>
              <Center>
                <HStack>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <IconButton
                      margin={"auto"}
                      key={num}
                      icon={<StarIcon />}
                      color={rating >= num ? "yellow.400" : "gray.300"}
                      onClick={() => handleRating(num)}
                      variant="ghost"
                      size="lg"
                      aria-label={`${num} stars`}
                    />
                  ))}
                </HStack>
              </Center>
            </FormControl>
            <Button colorScheme="teal" type="submit" width="full">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default ReviewForm;
