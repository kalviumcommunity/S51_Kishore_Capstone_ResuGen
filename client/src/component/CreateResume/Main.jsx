import React from 'react';
import {
    Container,
    Stack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import Builder from './Builder';
import ResumePreview from '../pages/ResumePreview';
import ThemeSelect from '../UserInputs/Theme/ThemeSelect';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../../Context';
import { MdOutlineFileDownload } from 'react-icons/md';
import ChatBox from './ChatBox';

const Main = () => {
    const { printElem, saveResumePreview } = useResume();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handlePrint = useReactToPrint({
        content: () => printElem.current,
    });

    const handleDownload = () => {
        handlePrint();
        saveResumePreview(printElem.current.innerHTML);
        onClose();
    };

    return (
        <Container bg={'gray.50'} minW={'full'} py={10} id='builder'>
            <Container maxW={'7xl'} px={8} my={3}>
                <Stack justifyContent={'space-between'} pt={4} direction={{ base: 'column', sm: 'row' }}>
                    <ThemeSelect />
                    <Button rightIcon={<MdOutlineFileDownload />} onClick={onOpen} colorScheme={'purple'}>Download</Button>
                </Stack>
            </Container>

            <Stack
                direction={{ base: 'column', md: 'row' }}
                mt={16}
                gap={4}
                mx={{ base: 2, md: 12 }}
                my={8}
                alignItems={'flex-start'}
                justifyContent={'space-between'}
            >
                <Builder />
                <ResumePreview />
            </Stack>

            <ChatBox />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Download Resume</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to download your resume as a PDF?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="purple" onClick={handleDownload}>
                            Download
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default Main;
