import React, { useState, useEffect } from "react";
import "./bootstrap.css";
import "./responsive.css";
import "./style.css";
import "./style.css.map"; // You might not need to import this in your JSX file
import "./style.scss";
import TextFooterContactUs from "./TextFooterContactUs";
import IconFooterContactus from "./IconFooterContactUs";
import TextFooterPrivacyPolicy from "./TextFooterPrivacyPolicy";
import TextFooterTermsOfUse from "./TextFooterTermsOfUse";
import VerticalDividerFooter from "./VerticalDividerFooter";
import { motion } from "framer-motion";
import ButtonDashboard from "./ButtonDashboard";
import ImageProfile from "./ImageProfile";
import TextUsername from "./TextUsername";
import TextGetStarted from "./TextGetStarted";
import ButtonSignIn from "./ButtonSignIn";
import IconLogout from "./IconLogout";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";

const HomePage = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log(isDrawerOpen);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  // Function to retrieve token from cookie
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        console.log("Token received:", value);
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
    // Check if the user is authenticated
    const token = getTokenFromCookie();
    if (token) {
      // User is authenticated, set authentication status to true
      setIsAuthenticated(true);
      // Fetch user data
      fetchUserData(token);
    }
  }, []);

  const clearToken = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  // Function to fetch user data
  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/get-user`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
      } else if (response.status === 404) {
        // If the request is unauthorized, log the user out
        console.log("Unauthorized. Logging user out.");
        setIsAuthenticated(false);
        setUserData(null);
        // Optionally, you can clear the token from cookies or local storage
        clearToken();
        window.location.reload();
      } else {
        console.error("Failed to fetch user data");
        setIsAuthenticated(false);
        setUserData(null);
        // Optionally, you can clear the token from cookies or local storage
        clearToken();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsAuthenticated(false);
      setUserData(null);
      // Optionally, you can clear the token from cookies or local storage
      clearToken();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    // Clear the authentication token from cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect user to login page
    window.location.reload();
  };

  return (
    <div className="hero_area">
      <div className="hero_bg_box">
        <div className="bg_img_box">
          <img src="hero-bg.png" alt="" />
        </div>
      </div>

      {/* Header section */}
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="">
              <img
                src="ClaimsCrafters.png"
                alt="Finexo Logo"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <span className=""> </span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              {isAuthenticated ? (
                // Render image profile and dashboard button if authenticated
                <>
                  <motion.div
                    initial={{ scale: 0 }} // Initial scale is 0
                    animate={{ scale: 1 }} // Animate to scale 1
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.0 }} // Transition duration
                  >
                    <ButtonDashboard />
                  </motion.div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    {/* ImageProfile */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "20px",
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }} // Initial scale is 0
                        animate={{ scale: 1 }} // Animate to scale 1
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 1.0 }} // Transition duration
                      >
                        <ImageProfile userData={userData} />
                      </motion.div>
                    </div>
                    {/* TextUsername */}
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "10px",
                        marginRight: "20px",
                      }}
                    >
                      {" "}
                      {/* Ensure TextUsername is centered */}
                      <motion.div
                        initial={{ scale: 0 }} // Initial scale is 0
                        animate={{ scale: 1 }} // Animate to scale 1
                        transition={{ duration: 1.0 }} // Transition duration
                      >
                        <TextUsername userData={userData} />
                      </motion.div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }} // Initial scale is 0
                    animate={{ scale: 1 }} // Animate to scale 1
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.0 }} // Transition duration
                  >
                    <IconLogout onClick={handleLogout} />
                  </motion.div>
                </>
              ) : (
                // Render sign-in button if not authenticated
                <>
                  <motion.div
                    initial={{ scale: 0 }} // Initial scale is 0
                    animate={{ scale: 1 }} // Animate to scale 1
                    whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
                    transition={{ duration: 1.0 }}
                    style={{
                      width: 100,
                      height: 100,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextGetStarted />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }} // Initial scale is 0
                    animate={{ scale: 1 }} // Animate to scale 1
                    whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
                    transition={{ duration: 1.0 }}
                    style={{
                      width: 200,
                      height: 100,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ButtonSignIn />
                  </motion.div>
                </>
              )}
              <form className="form-inline">
                <button
                  className="btn my-2 my-sm-0 nav_search-btn"
                  type="submit"
                >
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
            </div>
          </nav>
        </div>

        <div className={`drawer-content ${isDrawerOpen ? "open" : ""}`}>
          {!isAuthenticated ? (
            <>
              {
                <div
                  style={{
                    width: "100%",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <IoMdCloseCircleOutline
                    style={{ fontSize: "3rem", alignSelf: "flex-start" }}
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  />
                  <button
                    style={{
                      background: "#2A84EA",
                      border: "none",
                      padding: "10px",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      borderRadius: "10px",
                      flex: "1",
                      width: "90%",
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </button>
                  <button
                    style={{
                      background: "#2A84EA",
                      border: "none",
                      padding: "10px",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      borderRadius: "10px",
                      flex: "1",
                      width: "90%",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              }
            </>
          ) : (
            <div
              style={{
                width: "100%",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <IoMdCloseCircleOutline
                style={{ fontSize: "3rem", alignSelf: "flex-start" }}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              />
              <button
                style={{
                  background: "#2A84EA",
                  border: "none",
                  padding: "10px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  flex: "1",
                  width: "90%",
                }}
                onClick={() => navigate("/pmhs")}
              >
                Dashboard
              </button>

              <button
                style={{
                  background: "#2A84EA",
                  border: "none",
                  padding: "10px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  flex: "1",
                  width: "90%",
                }}
                onClick={() => navigate("/editProfile")}
              >
                Profile
              </button>

              <button
                style={{
                  background: "#2A84EA",
                  border: "none",
                  padding: "10px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  flex: "1",
                  width: "90%",
                }}
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      {/* End header section */}

      {/* Slider section */}
      <section className="slider_section">
        <div
          id="customCarousel1"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-box">
                      <h1 style={{ fontSize: "24px" }}>
                        {" "}
                        {/* Adjust the font size as needed */}
                        ContentsIQ: AI-Powered Precision in Residential Contents
                        Valuations for Modern Insurance
                      </h1>
                      <p>
                        Discover the future of insured residential contents
                        valuations with Claims Crafters' ContentsIQ, an
                        AI-powered platform transforming the insured contents
                        valuations process for insurers and homeowners alike.
                        Say goodbye to lengthy manual processes with quick,
                        automated and AI-derived valuations. Streamline
                        processing, delight customers, and strengthen carrier
                        relationships. Start with ContentsIQ today and turn the
                        challenge of contents valuations into an opportunity for
                        excellence.
                      </p>
                      <div className="btn-box">
                        <a href="/signup" className="btn1">
                          Get Started
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <video
                        controls
                        style={{ borderRadius: "10px", width: "100%" }}
                      >
                        <source
                          src="https://claimscrafters-react.s3.us-west-1.amazonaws.com/AboutContentsIQ.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Other carousel items go here */}
          </div>
        </div>
      </section>
      {/* End slider section */}

      {/* Service section */}
      <section className="service_section layout_padding">
        <div className="service_container">
          <div className="container">
            <div className="heading_container heading_center">
              <h2 className="heading">
                Crafting Contents Value <span>with AI</span>
              </h2>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="box">
                  <div className="img-box">
                    <img src="s1.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>The Challenge</h5>
                    <p>
                      The need for speed in claims settlement creates stress for
                      insurance professionals, who must balance accuracy and
                      efficiency amidst a constant stream of requests. This
                      workload overload can lead to valuation errors affecting
                      customer satisfaction and carrier relations.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box">
                  <div className="img-box">
                    <img src="s2.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>The Opportunity</h5>
                    <p>
                      Cutting-edge technology emphasizing efficiency and
                      accuracy is crucial for the insurance industry. As
                      settlement times shrink and service levels become
                      paramount, adapting to meet customer demands becomes
                      essential in an era of instant gratification. This pivotal
                      moment in insurance history will redefine industry
                      standards.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="box">
                  <div className="img-box">
                    <img src="s3.png" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>The Solution</h5>
                    <p>
                      Claims Crafters has harnessed the power of AI to
                      revolutionize the contents valuation process. ContentsIQ
                      is an AI powered platform that enables swift and accurate
                      valuations of insured contents, allowing insurers to
                      respond rapidly, departing from past lengthy wait times.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-box"></div>
          </div>
        </div>
      </section>
      {/* End service section */}

      <section className="about_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <div className="image_container">
              <img
                src="ContentsIQ.png"
                alt="Image description"
                style={{ marginBottom: "20px" }}
              />
            </div>

            <h2>
              The ContentsIQ’s Valuation Process –{" "}
              <span>From Days to Minutes</span>
            </h2>
          </div>
        </div>
      </section>

      <section className="why_section layout_padding">
        <div className="container">
          <div className="why_container">
            <div className="box">
              <div className="img-box">
                <img src="w1.png" alt="" />
              </div>
              <div className="detail-box">
                <h5>Submission</h5>
                <p>
                  User registers and creates a new, unique ContentsIQ project
                  related to a claim. Next, the user is guided to easily upload
                  the contents inventory data from Excel into ContentsIQ .
                  Eliminating the need to manually enter data and/or lookup
                  values.{" "}
                </p>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="w2.png" alt="" />
              </div>
              <div className="detail-box">
                <h5>Processing</h5>
                <p>
                  Upon inventory data submission and validation, ContentIQ’s
                  applies its AI engines to determine a Replacement Cost Value
                  (RCV), Actual Cash Value (ACV) and assigns a Class and
                  Subclass to determine the Depreciated value for each item.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="img-box">
                <img src="w3.png" alt="" />
              </div>
              <div className="detail-box">
                <h5>Completion</h5>
                <p>
                  Once the Processing has been completed, a comprehensive
                  assessment of the contents inventory value will be made
                  available for the user to view, make changes if necessary and
                  download and/or share via email.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info_section layout_padding2">
        <div className="container">
          <div
            className="row"
            style={{
              paddingBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="col-4 col-md-6 col-lg-6 info_col">
              <div className="info_contact">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextFooterContactUs />
                    {/* <IconFooterContactus /> */}
                  </div>
                </div>
              </div>
              {/* <div className="info_social">
                <a href="#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </div> */}
            </div>
            {/* <div className="col-1 col-md-6 col-lg-3 info_col"></div>
            <div className="col-1 col-md-6 col-lg-2 mx-auto info_col"></div> */}
            <div className="col-7 col-md-6 col-lg-6 info_col">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <TextFooterTermsOfUse />
                <VerticalDividerFooter />
                <TextFooterPrivacyPolicy />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
