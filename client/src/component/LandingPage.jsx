import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import SignUpPage from "./SignUp/SignUp";
import Logo from "../assets/Logo.png";
import LandingPageLogo from "../assets/landing-page-img.png";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";
import { Scrollbars } from "react-custom-scrollbars";
import { useSpring, animated } from "@react-spring/web";
import useUser from "../Hooks/useUser";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { GrFormClose } from "react-icons/gr";
import Spinner from "./SpinnerCompo/Spinner";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useQueryClient } from "react-query";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const navigate = useNavigate();

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
    checkUserStatus()

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoScroll = () => {
    const navbarDiv = document.querySelector(".content");
    if (navbarDiv) {
      navbarDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  const checkUserStatus = async () => {
    const { data, isLoading, isError } = await useUser();
    if (!isLoading && !isError && data) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
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
    if (window.scrollY > 200) {
      setNavbarVisible(false);
      console.log("Navbar hidden");
    } else {
      setNavbarVisible(true);
    }
  };

  // const { data, isLoading, isError } = useUser();

  const queryClient = useQueryClient();

  // if (isLoading) {
  //   return <Spinner />;
  // }

  const handleLogOut = async () => {
    console.log("User logged out")
    try {
      await auth.signOut().then(() => {
        queryClient.setQueryData("user", null);
      });
      // navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          handleHamburgerAnimation={handleHamburgerAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className="dashboard-menu"
        >
          {isMenuOpen && (
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
              {userLoggedIn ? (
                <p onClick={handleLogOut} className="logout context pointer">
                  Log out
                </p>
              ) : (
                <Link className="login" to="/login">
                  <p className="login context pointer">Login</p>
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

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
            {userLoggedIn ? (
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
        {/* <button className="get-started-btn">
              Get Started
            </button> */}
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
          <div className="example"></div>
          <div className="example"></div>
          <div className="example"></div>
          <div className="example"></div>
          <div className="example"></div>
          <div className="example"></div>
        </div>
      </div>
      {/* </Scrollbars> */}
    </>
  );
};

export default LandingPage;
