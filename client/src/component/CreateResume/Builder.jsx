import {
    Box,
    TabList,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    Text
  } from '@chakra-ui/react';
  import React from 'react';
  import About from '../UserInputs/PersonalDetails/About';
  import Education from '../UserInputs/Education/Education';
  import Projects from '../UserInputs/UserAdditional/Projects';
  import Skills from '../UserInputs/Skills/Skills';
  import Work from '../UserInputs/Experience/Work';
  
  const Builder = () => {
    return (
      <Box
        bg='white'
        w='full'
        maxW='xl'
        rounded='md'
        shadow='md'
        overflow='hidden'
        p={4} // added padding to ensure inner content is not touching the borders
      >
        <Tabs isFitted variant='enclosed'>
          <TabList>
            <Tab>
              <Text fontWeight='medium'>About</Text>
            </Tab>
            <Tab>
              <Text fontWeight='medium'>Education</Text>
            </Tab>
            <Tab>
              <Text fontWeight='medium'>Skills</Text>
            </Tab>
            <Tab>
              <Text fontWeight='medium'>Work</Text>
            </Tab>
            <Tab>
              <Text fontWeight='medium'>Projects</Text>
            </Tab>
            {/* <Tab>
              <Text fontWeight='medium'>Other Details</Text>
            </Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <About />
            </TabPanel>
            <TabPanel>
              <Education />
            </TabPanel>
            <TabPanel>
              <Skills />
            </TabPanel>
            <TabPanel>
              <Work />
            </TabPanel>
            <TabPanel>
              <Projects />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
  };
  
  export default Builder;
  