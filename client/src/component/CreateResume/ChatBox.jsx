import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, Text, IconButton, HStack, Fade, UnorderedList, ListItem } from '@chakra-ui/react';
import { IoChatbox } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useResume } from '../../Context';

const hintMessages = [
    "TRY 'give me some tips'",
    "Hey, TRY ME!",
    "Need help with your resume?",
    "Ask me for resume tips!",
    "I'm here to assist you with resume building.",
    "Wondering how to improve your resume?",
];

const ChatBox = () => {
    const { workList } = useResume();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [hint, setHint] = useState('');
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const hintInterval = setInterval(() => {
            setHint(hintMessages[Math.floor(Math.random() * hintMessages.length)]);
            setShowHint(true);
            setTimeout(() => setShowHint(false), 5000);
        }, 1000);

        return () => clearInterval(hintInterval);
    }, []);

    const handleSend = async () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            let response;
            if (input.toLowerCase() === "give me some tips") {
                response = await fetch('http://localhost:6969/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: input, experience: workList }),
                });
            } else {
                response = await fetch('http://localhost:6969/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: input }),
                });
            }
            const data = await response.json();
            const botResponse = data.response;

            // Check if bot response is a list of points
            const isList = Array.isArray(botResponse);

            if (isList) {
                setMessages([...messages, { text: input, sender: 'user' }]);
                botResponse.forEach(point => {
                    setMessages(prevMessages => [...prevMessages, { text: point, sender: 'bot' }]);
                });
            } else {
                setMessages([...messages, { text: input, sender: 'user' }, { text: botResponse, sender: 'bot' }]);
            }
        }
    };

    return (
        <>
            <Box position="fixed" bottom="4" right="4">
                <IconButton
                    icon={<IoChatbox style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}
                    isRound
                    size="lg"
                    colorScheme="purple"
                    onClick={() => setIsOpen(true)}
                    display={isOpen ? 'none' : 'block'}
                />
            </Box>
            {isOpen && (
                <Box
                    position="fixed"
                    bottom="4"
                    right="4"
                    bg="white"
                    p={4}
                    borderRadius="md"
                    boxShadow="md"
                    maxW="md"
                    zIndex="1001"
                >
                    <VStack spacing={4}>
                        <Box w="full" h="300px" overflowY="auto" bg="gray.30" p={4} borderRadius="md">
                            {messages.map((msg, index) => (
                                <Text key={index} alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
                                    <b>{msg.sender === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
                                </Text>
                            ))}
                        </Box>
                        <HStack w="full">
                            <Input
                                onSubmit={handleSend}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                            />
                            <Button onClick={handleSend} colorScheme="purple">
                                Send
                            </Button>
                        </HStack>
                        <IconButton
                            icon={<IoIosClose style={{ fontSize: '30px' }} />}
                            size="sm"
                            alignSelf="flex-end"
                            onClick={() => setIsOpen(false)}
                        />
                    </VStack>
                </Box>
            )}
            {showHint && (
                <Fade in={showHint}>
                    <Box
                        position="fixed"
                        bottom="20"
                        right="4"
                        bg="transparent"
                        // opacity={0.8}
                        p={3}
                        borderRadius="md"
                        boxShadow="md"
                        maxW="sm"
                        zIndex="1"
                    >
                        <Text>{hint}</Text>
                    </Box>
                </Fade>
            )}
        </>
    );
};

export default ChatBox;
