import React from "react";
import {
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  keyframes,
  useColorModeValue,
  Icon,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const jiggle = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-1px); }
`;

const reviews = [
  {
    name: "Emily Clark",
    rating: 5,
    comment: "The resume builder is user-friendly and efficient. My resume looks professional!",
  },
  {
    name: "Michael Brown",
    rating: 4,
    comment: "Great tool for creating a resume. A bit more customization options would be nice.",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely loved the templates. Made my resume stand out in job applications.",
  },
  {
    name: "David Lee",
    rating: 3,
    comment: "Good service, but some sections were a bit confusing to fill out.",
  },
];

const DummyReviews = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Box maxW="1200px" mx="auto" mt={10} p={5}>
      <Heading as="h2" size="2.5em" mb={8} textAlign="center">
        User Reviews
      </Heading>
      <Box
        mt={25}
        display="flex"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {reviews.map((review, index) => (
          <Link to="/reviews" style={{ textDecoration: "none", color: "grey" }} key={index}>
            <Card
              cursor={"pointer"}
              p={5}
              borderRadius="5px"
              w="250px"
              h="7rem"
              bg={bgColor}
              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
              transition="transform 0.3s, box-shadow 0.3s"
              _hover={{ animation: `${jiggle} 0.5s`, boxShadow: "xl" }}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              flexWrap="wrap"
            >
              <CardHeader>
                <HStack spacing={2} align="center">
                  <Text fontWeight="bold" fontSize="lg" p={5} mt={5}>
                    {review.name}
                  </Text>
                  <HStack spacing={1}>
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Icon as={FaStar} key={i} color="gold" />
                    ))}
                  </HStack>
                </HStack>
              </CardHeader>
              <CardBody ml={5}>
                <Text fontSize="md" color="gray.600">
                  {review.comment}
                </Text>
              </CardBody>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default DummyReviews;
