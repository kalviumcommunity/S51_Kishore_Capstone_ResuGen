// Work.js

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormLabel, HStack, Input, Select, Textarea, VStack, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useResume } from '../../../Context';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const Work = () => {
    const { workList, setWorkList } = useResume();
    const [summary, setSummary] = useState("");

    const addMore = () => {
        setWorkList([...workList, { id: uuidv4(), position: "", company: "", type: "", startDate: "", endDate: "", description: "" }]);
    }

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        const updatedWorkList = workList.map((work) => (
            work.id === id ? { ...work, [name]: value } : work
        ));

        setWorkList(updatedWorkList);
    }

    const deleteWork = (id) => {
        setWorkList(workList.filter((elem) => elem.id !== id))
    }

    useEffect(() => {
        if (workList.length > 0) {
            generateSummary();
        }
    }, [workList]);

    const generateSummary = async () => {
        try {
            const response = await axios.post('http://localhost:6969/work-summary', { experience: workList });
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Error generating summary:", error);
        }
    }

    return (
        <>
            <Accordion allowToggle defaultIndex={[0]}>
                {
                    workList.map((work, index) => (
                        <AccordionItem key={index}>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Text fontWeight={'medium'}>{work.position ? work.position : "Position"}</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Input value={work.position} onChange={(e) => handleChange(e, work.id)} name='position' type='text' variant='filled' placeholder='Position' mb={3} />
                                <HStack spacing={3}>
                                    <Input value={work.company} onChange={(e) => handleChange(e, work.id)} name='company' type='text' variant='filled' placeholder='Company' />
                                    <Select value={work.type} onChange={(e) => handleChange(e, work.id)} name='type' variant='filled' placeholder='Employment Type'>
                                        <option value='Full-time'>Full-time</option>
                                        <option value='Part-time'>Part-time</option>
                                        <option value='Internship'>Internship</option>
                                        <option value='Freelance'>Freelance</option>
                                    </Select>
                                </HStack>
                                <HStack spacing={3} mt={4}>
                                    <FormControl>
                                        <FormLabel htmlFor='startDate'>Start Date</FormLabel>
                                        <Input value={work.startDate} onChange={(e) => handleChange(e, work.id)} name='startDate' id='startDate' type='month' variant="filled" placeholder='Start Date' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor='endDate'>End Date</FormLabel>
                                        <Input value={work.endDate} onChange={(e) => handleChange(e, work.id)} name='endDate' id='endDate' type='month' variant='filled' placeholder='End Date' />
                                    </FormControl>
                                </HStack>
                                <FormControl mt={3}>
                                    <FormLabel htmlFor='description'>Description</FormLabel>
                                    <Textarea value={work.description} onChange={(e) => handleChange(e, work.id)} name='description' id='description' variant='filled' placeholder='Description...' />
                                </FormControl>
                                <Button rightIcon={<MdDelete />} onClick={() => deleteWork(work.id)} mt={3} colorScheme={'red'}>Delete</Button>
                            </AccordionPanel>
                        </AccordionItem>
                    ))
                }
            </Accordion>
            {
                workList.length < 3 && (
                    <Button colorScheme={'purple'} my={5} onClick={addMore}>Add More</Button>
                )
            }
            {summary && (
                <Box mt={5} p={5} border="1px solid" borderColor="gray.200" borderRadius="md">
                    <Text fontWeight="bold">Generated Work Summary:</Text>
                    <Text>{summary}</Text>
                </Box>
            )}
        </>
    )
}

export default Work;
