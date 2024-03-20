import React, { useEffect } from "react";
import "./LandingPage.css";
import Logo from "../assets/Logo.png";
import LandingPageLogo from "../assets/landing-page-img.png"
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Splide as CoreSplide } from "@splidejs/splide";
import { Intersection } from "@splidejs/splide-extension-intersection";

const LandingPage = () => {
  useEffect(() => {
    new CoreSplide("#splide", {
      type: "loop",
      perPage: 2,
      gap: "2rem",
      border: "2px solid black",
      breakpoints: {
        600: {
          perPage: 1,
        },
      },
    }).mount({ Intersection });
  }, []);

  const handleTemplateScroll = () => {
    const splideSection = document.querySelector(".splide");
    if (splideSection) {
      splideSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="nav-bar">
        <div className="top-left">
          <Link to="/">
            <img className="logo" src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="navi-bar">
          <div className="middle">
            <p className="context">Build Your Resume</p>
            {/* <Link to="/build"> */}
             <p className="context">Resume Examples</p>
            {/* </Link> */}
            
            <p className="context" onClick={handleTemplateScroll}>Resume Templates</p>
          </div>

          <div className="top-right">
            <Link className="login" to="/login">
              <p className="login context pointer">Login</p>
            </Link>

            <div className="build-res-btn pointer">
              <Button
                sx={{
                  border: "2px solid orange",
                  color: "black",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "orange",
                    color: "white",
                  },
                  transition: "background-color 0.3s ease",
                }}
              >
                Build my Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="content-right">
          <img className="content-right-img" src={LandingPageLogo} alt="" />
        </div>
        <div className="content-left">
          <h1>Build Your Dream Resume Now!</h1>
          <div className="description">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum</p>
          </div>

          <div className="get-started-btn">
            <Button
              sx={{
                border: "2px solid black",
                color: "black",
                fontWeight: "medium",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      <div className="features-div">
        <h2 className="features-title">
          Get our dream job sooner with this
          <br /> easy-to-use resume builder app
        </h2>
        <div className="features">
          <div className="feature one">
            <div className="feature-heading">
              <h2>Professional Templates</h2>
            </div>

            <p className="feature-p">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum sint
              dignissimos quia temporibus id! Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Esse ?
            </p>
          </div>
          <div className="feature two">
            <div className="feature-heading">
              <h2>Customisable fonts and colors</h2>
            </div>

            <p className="feature-p">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum sint
              dignissimos quia temporibus id! Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Esse ?
            </p>
          </div>
          <div className="feature three">
            <div className="feature-heading">
              <h2>Free resume Examples</h2>
            </div>

            <p className="feature-p">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum sint
              dignissimos quia temporibus id! Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Esse ?
            </p>
          </div>
          <div className="feature four">
            <div className="feature-heading">
              <h2>Professional Templates</h2>
            </div>

            <p className="feature-p">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum sint
              dignissimos quia temporibus id! Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Esse ?
            </p>
          </div>
        </div>
      </div>

      <div className="splide">
        <Splide id="splide">
          <SplideSlide className="splide__slide">
            <img src={Logo} alt="Image 1" />
          </SplideSlide>
          <SplideSlide className="splide__slide">
            <img src={Logo} alt="Image 2" />
          </SplideSlide>
          <SplideSlide className="splide__slide">
            <img src={Logo} alt="Image 3" />
          </SplideSlide>
          <SplideSlide className="splide__slide">
            <img src={Logo} alt="Image 4" />
          </SplideSlide>
          <SplideSlide className="splide__slide">
            <img src={Logo} alt="Image 5" />
          </SplideSlide>
          <SplideSlide className="splide__slide">
            <img src={Logo} alt="Image 6" />
          </SplideSlide>
          <SplideSlide className="splide__slide">
            <img src={Logo} alt="Image 7" />
          </SplideSlide>
        </Splide>
      </div>

      <div className="footer">
        <h2>To</h2>
      </div>
    </>
  );
};

export default LandingPage;
