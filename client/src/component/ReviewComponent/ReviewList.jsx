import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Spinner,
  Center,
  SimpleGrid,
  Button,
  keyframes,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Header from "../HeaderComponent/Header";

const jiggle = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-1px); }
`;

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:6969/reviews');  
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const allReviews = reviews; 
  const paginatedReviews = allReviews.slice(0, page * reviewsPerPage);

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <>
      <Header />

      <Box
        maxW="800px"
        mx="auto"
        mt={5}
        p={5}
        borderWidth={1}
        borderRadius="lg"
        shadow="md"
      >
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Reviews
        </Heading>
        <VStack spacing={4} align="center">
          {paginatedReviews.map((review) => (
            <Box
              w="45vw"
              h="auto"
              key={review._id}
              p={4}
              borderWidth={1}
              borderRadius="lg"
              shadow="sm"
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{ animation: `${jiggle} 0.5s`, boxShadow: "lg" }}
            >
              <HStack spacing={4}>
                <Text fontWeight="bold">{review.name}</Text>
                <HStack>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      color={i < review.rating ? "yellow.400" : "gray.300"}
                    />
                  ))}
                </HStack>
              </HStack>
              <Text mt={2}>{review.comment}</Text>
            </Box>
          ))}
        </VStack>
        {allReviews.length > page * reviewsPerPage && (
          <Center mt={4}>
            <Button onClick={handleSeeMore}>See More</Button>
          </Center>
        )}
      </Box>
    </>
  );
};

export default ReviewList;
