import React from 'react';
import "./LinkedInBuilder.css";
import Header from '../HeaderComponent/Header';
import { VscFilePdf } from "react-icons/vsc";
import { PDFDocument } from 'pdf-lib';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../Context';

const LinkedInBuilder = () => {
  // const { setAbout, setEducationList, setSkills, setWorkList, setProjects } = useResume();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfData = new Uint8Array(e.target.result);
        const pdfDoc = await PDFDocument.load(pdfData);
        const textContent = await pdfDoc.getTextContent();
        const text = textContent.items.map(item => item.str).join(" ");

        // Extract relevant data from the text
        const extractedData = parseLinkedInPDF(text);

        // Update state with extracted data
        setAbout({
          name: extractedData.name,
          role: extractedData.role,
          email: extractedData.email,
          phone: extractedData.phone,
          address: extractedData.address,
          linkedin: extractedData.linkedin,
          picture: "" // Handle picture separately if needed
        });
        setEducationList(extractedData.educationList);
        setSkills(extractedData.skills);
        setWorkList(extractedData.workList);
        setProjects(extractedData.projects);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const parseLinkedInPDF = (text) => {
    // Implement a parsing function to extract data from the text
    // Example:
    return {
      name: extractName(text),
      role: extractRole(text),
      email: extractEmail(text),
      phone: extractPhone(text),
      address: extractAddress(text),
      linkedin: extractLinkedIn(text),
      educationList: extractEducationList(text),
      skills: extractSkills(text),
      workList: extractWorkList(text),
      projects: extractProjects(text),
    };
  };

  return (
    <>
      <Header />
      <div className="LiBuilder-top">
        <h1>Import from LinkedIn</h1>
        <p>Go to <a href="https://www.linkedin.com">LinkedIn</a> and open your profile. Then, hit "More" and "Save to PDF" to download your profile as a PDF file.</p>
      </div>
      <div className="LiBuilder-main">
        <div className="Li-left">
          <img src="https://app.resumebuilder.com/assets/images/animated-linkedin-new.gif" alt="" />
        </div>
        <div className="Li-right">
          <form className="file-upload-form">
            <label htmlFor="file" className="file-upload-label">
              <div className="file-upload-design">
                <VscFilePdf style={{ fontSize: "100px", color: "#013564" }} />
                <p>Drag or upload your downloaded LinkedIn profile PDF.</p>
                <span className="browse-button">Browse file</span>
              </div>
              <input id="file" type="file" onChange={handleFileUpload} />
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

export default LinkedInBuilder;
