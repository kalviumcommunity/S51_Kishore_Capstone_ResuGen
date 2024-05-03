import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import SignUpPage from "./SignUp/SignUp";
import Logo from "../assets/Logo.png";
import LandingPageLogo from "../assets/landing-page-img.png";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";
// import { Scrollbars } from "react-custom-scrollbars";
import { useSpring, animated } from "@react-spring/web";
import useUser from "../Hooks/useUser";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { GrFormClose } from "react-icons/gr";
import Spinner from "./SpinnerCompo/Spinner";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { adminId } from "../admin/AdminAcc";
import stickynote from "../assets/sticky-notes.png";
import templateicon from "../assets/feature-template-img.png";
import resumeicon from "../assets/resume.png";
import customfonticon from "../assets/font-size.png";
import Skeleton from "react-loading-skeleton";
import Foot from "./Footer/Footer";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "../utils/CustomScrollBar.css"

// import {useUser} from "../Hooks"

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [tempImg, setTemplateImg] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  // const [userData, setUserData] = useState(null);

  const { data, isLoading, isError } = useUser();

  // console.log(isLoading, "Loading")
  console.log(data, "data");

  const navigate = useNavigate();

  console.log(isLoading, "Loading");

  const checkUserStatus = async () => {
    if (!isLoading && !isError && data) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  };

  if (isLoading){
    <Spinner />
  }

  const fetchTemplateData = async () => {
    try {
      const response = await fetch("http://localhost:3000/template");
      const templateData = await response.json();
      setTemplateImg(templateData);
      console.log(tempImg, "templateData");
    } catch (err) {
      console.log("Error fetching data", err);
    }
  };

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

    checkUserStatus();
    fetchTemplateData();
    // fetchData();
    window.addEventListener("scroll", handleBackToTopScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleBackToTopScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoScroll = () => {
    const navbarDiv = document.querySelector(".content");
    if (navbarDiv) {
      navbarDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExampleScroll = () => {
    const splideSection = document.querySelector(".splide");
    if (splideSection) {
      splideSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTemplateScroll = () => {
    const templateContainer = document.querySelector(".resume-example-div");
    if (templateContainer) {
      templateContainer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackToTopScroll = () => {
    if (window.scrollY > 1000) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const handleHamburgerAnimation = {
    initial: {
      scaleY: 0,
      opacity: 0,
    },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 1],
      },
    },
  };

  const toggleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const animation = useSpring({
    from: { opacity: 0, transform: "translateY(-15%)" },
    to: {
      opacity: navbarVisible ? 1 : 0,
      transform: navbarVisible ? "translateY(0)" : "translateY(-100%)",
    },
    // delay:500
  });

  const contentAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(20px)" },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  });

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setNavbarVisible(false);
      console.log("Navbar hidden");
    } else {
      setNavbarVisible(true);
    }
  };

  const queryClient = useQueryClient();

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      queryClient.setQueryData("user", null);
      toast.success("Logged Out Successfully");
      setUserData(null);

      // navigate("/");
      // Show success message
      console.log("Logged Out Successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isMenuOpen && (
        <AnimatePresence>
          <motion.div
            handleHamburgerAnimation={handleHamburgerAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className="dashboard-menu"
          >
            <div className="menu-content">
              <div className="close-div">
                <GrFormClose
                  onClick={toggleHamburgerClick}
                  style={{
                    width: "2rem",
                    height: "5rem",
                  }}
                />
              </div>
              <Link to="/build">
                <p className="context menu">Build Your Resume</p>
              </Link>
              <p className="context menu" onClick={handleExampleScroll}>
                Resume Examples
              </p>
              <p className="context menu" onClick={handleTemplateScroll}>
                Resume Templates
              </p>
              <Link to="/my-resumes">
                <p className="context menu">My Resumes</p>
              </Link>

              {data ? (
                <p onClick={handleLogOut} className="logout context pointer">
                  Log out
                </p>
              ) : (
                <Link className="login" to="/login">
                  <p className="login context pointer">Login</p>
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {showBackToTop && (
        <div className="back-to-top-btn" onClick={scrollToTop}>
          <svg className="svgIcon" viewBox="0 0 384 512">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
          </svg>
        </div>
      )}

      <animated.div style={animation} className="nav-bar">
        <GiHamburgerMenu
          onClick={toggleHamburgerClick}
          className="hamburger-icon"
          style={{ width: "7.5rem" }}
        />

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

            <p className="context" onClick={handleTemplateScroll}>
              Resume Templates
            </p>
            <Link to="/my-resumes">
              <p className="context">My Resumes</p>
            </Link>
          </div>

          <div className="top-right">
            {/* {console.log(userLoggedIn)} */}
            {data ? (
              <p onClick={handleLogOut} className="logout context pointer">
                Log out
              </p>
            ) : (
              <Link className="login" to="/login">
                <p className="login context pointer">Login</p>
              </Link>
            )}

            <div className="build-res-btn pointer">
              <Link to="/build">
                <Button
                  sx={{
                    border: "2px solid lightblue",
                    color: "black",
                    borderRadius: "15px",
                    textDecoration: "none",
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

      <animated.div style={contentAnimation} className="content">
        <div className="content-right">
          <img className="content-right-img" src={LandingPageLogo} alt="" />
        </div>
        <div className="content-left">
          <h1>Build Your Dream Resume Now!</h1>
          <div className="description">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum</p>
          </div>

          <div className="get-started-btn">
            <Link to="/build">
              <Button
                sx={{
                  border: "2px solid black",
                  color: "black",
                  fontWeight: "medium",
                  padding: "8px",

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
      </animated.div>

      <div className="features-div">
        <h2 className="features-heading">
          Get our dream job sooner with this
          <br /> easy-to-use resume builder app
        </h2>
        <div className="features">
          <div className="feature one">
            <div className="feature-heading">
              <img className="features-img" src={templateicon} alt="" />
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
              <img className="features-img" src={customfonticon} alt="" />
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
              <img className="features-img" src={resumeicon} alt="" />
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
              <img className="features-img" src={stickynote} alt="" />
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

      <div className="splide-div">
        <h2 className="splide-heading">Check out some of our templates :)</h2>

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
          {Array.isArray(tempImg) &&
            tempImg.map((data) => (
              <div className="example">
                <img key={data.id} src={data.templateImg} alt="template" />
              </div>
            ))}
        </div>
      </div>
      {/* </Scrollbars> */}
      <Foot />
    </>
  );
};

export default LandingPage;
