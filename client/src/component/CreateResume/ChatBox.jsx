// ChatBox.js
import React, { useState } from 'react';
import { Box, Input, Button, VStack, Text, IconButton, HStack } from '@chakra-ui/react';
// import { CloseIcon, ChatIcon } from '@chakra-ui/icons';
import { IoChatbox } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSend = async () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            const response = await fetch('https://s51-kishore-capstone-resume-builder.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();
            setMessages([...messages, { text: input, sender: 'user' }, { text: data.response, sender: 'bot' }]);
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
                    zIndex="1000"
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
        </>
    );
};

export default ChatBox;
