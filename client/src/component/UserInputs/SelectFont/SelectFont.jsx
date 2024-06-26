import React, { useState, useEffect } from 'react';
import WebFont from 'webfontloader';
import { Select } from '@chakra-ui/react';
import { useResume } from '../../Context';

const SelectFont = () => {
  const { setFont } = useResume();
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          'Roboto:400,700',
          'Open Sans:400,700',
          'Lato:400,700',
          'Montserrat:400,700',
          'Source Sans Pro:400,700',
          'Raleway:400,700',
          'Merriweather:400,700',
          'Noto Sans:400,700',
        ],
      },
    });
    setFonts([
      'Roboto',
      'Open Sans',
      'Lato',
      'Montserrat',
      'Source Sans Pro',
      'Raleway',
      'Merriweather',
      'Noto Sans',
    ]);
  }, []);

  const handleFontChange = (e) => {
    setFont(e.target.value);
  };

  return (
    <Select placeholder="Select Font" onChange={handleFontChange}>
      {fonts.map((font, index) => (
        <option key={index} value={font}>
          {font}
        </option>
      ))}
    </Select>
  );
};

export default SelectFont;
