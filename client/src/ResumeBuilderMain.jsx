import React from 'react'
import Main from "./component/CreateResume/Main";
import { ResumeProvider } from "./Context";
import { ChakraProvider } from '@chakra-ui/react'
import WebFont from 'webfontloader';

const BuildMain = () => {
  return (
    <>
    <ChakraProvider>
      <ResumeProvider>
        <Main />
      </ResumeProvider>
    </ChakraProvider>
    </>
  )
}

export default BuildMain