import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import Logo from "../assets/Logo.png";
import LandingPageLogo from "../assets/landing-page-img.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";
import { Scrollbars } from "react-custom-scrollbars";
import { useSpring, animated } from "@react-spring/web";

const LandingPage = () => {
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    new Splide("#splide", {
      type: "loop",
      perPage: 3,
      focus: "center",
      autoplay: true,
      interval: 8000,
      flickMaxPages: 3,
      updateOnMove: true,
      pagination: false,
      padding: "10%",
      throttle: 300,
      breakpoints: {
        1440: {
          perPage: 1,
          padding: "30%",
        },
      },
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleExampleScroll = () => {
    const splideSection = document.querySelector(".splide");
    if (splideSection) {
      splideSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoScroll = () => {
    const navbarDiv = document.querySelector(".content");
    if (navbarDiv) {
      navbarDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  const animation = useSpring({
    from: { opacity: 0, transform: "translateY(-15%)" },
    to: {
      opacity: navbarVisible ? 1 : 0,
      transform: navbarVisible ? "translateY(0)" : "translateY(-100%)",
    },
    // delay:500
  });

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setNavbarVisible(false);
      console.log("Navbar hidden");
    } else {
      setNavbarVisible(true);
    }
  };

  return (
    <>
      <animated.div style={animation} className="nav-bar">
        <div className="top-left">
          <Link to="/">
            <img
              className="logo"
              src={Logo}
              alt="logo"
              onClick={handleLogoScroll}
            />
          </Link>
        </div>

        <div className="navi-bar">
          <div className="middle">
            <Link to="/build">
              <p className="context">Build Your Resume</p>
            </Link>
            <p className="context" onClick={handleExampleScroll}>
              Resume Examples
            </p>

            <p className="context">Resume Templates</p>
            <p className="context">My Resumes</p>
          </div>

          <div className="top-right">
            <Link className="login" to="/login">
              <p className="login context pointer">Login</p>
            </Link>

            <div className="build-res-btn pointer">
              <Link to="/build">
                <Button
                  sx={{
                    border: "2px solid lightblue",
                    color: "black",
                    borderRadius: "15px",
                    "&:hover": {
                      backgroundColor: "lightblue",
                      color: "white",
                    },
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Build my Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </animated.div>

      <Scrollbars style={{ width: "100%", height: "80vh" }}>
        <div className="content">
          <div className="content-right">
            <img className="content-right-img" src={LandingPageLogo} alt="" />
          </div>
          <div className="content-left">
            <h1>Build Your Dream Resume Now!</h1>
            <div className="description">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum
              </p>
            </div>

            <div className="get-started-btn">
              <Link to="/build">
                <Button
                  sx={{
                    border: "2px solid black",
                    color: "black",
                    fontWeight: "medium",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  className="button"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="features-div">
          <h2 className="features-heading">
            Get our dream job sooner with this
            <br /> easy-to-use resume builder app
          </h2>
          <div className="features">
            <div className="feature one">
              <div className="feature-heading">
                <h2>Professional Templates</h2>
              </div>

              <p className="feature-p">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum
                sint dignissimos quia temporibus id! Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Esse ?
              </p>
            </div>
            <div className="feature two">
              <div className="feature-heading">
                <h2>Customisable fonts and colors</h2>
              </div>

              <p className="feature-p">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum
                sint dignissimos quia temporibus id! Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Esse ?
              </p>
            </div>
            <div className="feature three">
              <div className="feature-heading">
                <h2>Free resume Examples</h2>
              </div>

              <p className="feature-p">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum
                sint dignissimos quia temporibus id! Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Esse ?
              </p>
            </div>
            <div className="feature four">
              <div className="feature-heading">
                <h2>Professional Templates</h2>
              </div>

              <p className="feature-p">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum
                sint dignissimos quia temporibus id! Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Esse ?
              </p>
            </div>
          </div>
          {/* <button className="get-started-btn">
            Get Started
          </button> */}
        </div>

        <div className="splide-div">
          <h2 className="splide-heading">
            Check out some of our templates :)
          </h2>

          <div id="splide" className="splide">
            <Splide
              options={{
                type: "loop",
                perPage: 4,
                fixedWidth: true,
                focus: "center",
                autoplay: true,
                interval: 8000,
                flickMaxPages: 3,
                updateOnMove: true,
                pagination: true,
                padding: "10%",
                throttle: 1000,
                breakpoints: {
                  1440: {
                    perPage: 1,
                    padding: "30%",
                  },
                },
              }}
            >
              <SplideSlide>
                <img src={Logo} alt="Slide 1" />
                <p>This is slide one.</p>
              </SplideSlide>
              <SplideSlide>
                <img src={Logo} alt="Slide 2" />
                <p>This is slide two.</p>
              </SplideSlide>
              <SplideSlide>
                <img src={Logo} alt="Slide 3" />
                <p>This is slide three</p>
              </SplideSlide>
              <SplideSlide>
                <img src={Logo} alt="Slide 4" />
                <p>This is slide four</p>
              </SplideSlide>
            </Splide>
          </div>
        </div>

        <div className="resume-example-div">
          <div className="example-heading">
              <h2>Our Most Popular Resume Example</h2>
          </div>
          <div className="examples">
            <div className="example"></div>
            <div className="example"></div>
            <div className="example"></div>
            <div className="example"></div>
            <div className="example"></div>
            <div className="example"></div>
          </div>
        </div>
      </Scrollbars>
    </>
  );
};

export default LandingPage;
