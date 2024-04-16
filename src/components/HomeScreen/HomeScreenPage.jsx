// HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import ButtonSignIn from './ButtonSignIn';
import ButtonTheChallenge from './ButtonTheChallenge';
import ButtonTheOpportunity from './ButtonTheOpportunity';
import ButtonTheSolution from './ButtonTheSolution';
import Card from './Card';
import CardBackground from './CardBackground';
import CardBackgroundHeader from './CardBackgroundHeader';
import CardFooter from './CardFooter';
import CardText from './CardText';
import Circle1 from './Circle1';
import Circle2 from './Circle2';
import Circle3 from './Circle3';
import Header from './Header';
import HeaderText from './HeaderText';
import IconCircle1 from './IconCircle1';
import IconCircle2 from './IconCircle2';
import IconCircle3 from './IconCircle3';
import IconFooterContactus from './IconFooterContactUs';
import ImageJumbotron from './ImageJumbotron';
import ImageLogo from './ImageLogo';
import ImageLogoFooter from './ImageLogoFooter';
import TextCircle1Body from './TextCircle1Body';
import TextCircle1Header from './TextCircle1Header';
import TextCircle2Body from './TextCircle2Body';
import TextCircle2Header from './TextCircle2Header';
import TextCircle3Body from './TextCircle3Body';
import TextCircle3Header from './TextCircle3Header';
import TextFooterContactUs from './TextFooterContactUs';
import TextFooterPrivacyPolicy from './TextFooterPrivacyPolicy';
import TextFooterTermsOfUse from './TextFooterTermsOfUse';
import TextGetStarted from './TextGetStarted';
import TextMainBody from './TextMainBody';
import TextMainHeader from './TextMainHeader';
import TextTheChallengeBody from './TextTheChallengeBody';
import TextTheChallengeHeader from './TextTheChallengeHeader';
import TextTheOpportunityBody from './TextTheOpportunityBody';
import TextTheOpportunityHeader from './TextTheOpportunityHeader';
import TextTheSolutionBody from './TextTheSolutionBody';
import TextTheSolutionHeader from './TextTheSolutionHeader';
import VerticalDividerFooter from './VerticalDividerFooter';
import ButtonDashboard from './ButtonDashboard';
import ImageProfile from './ImageProfile';
import TextUsername from './TextUsername';
import { motion } from "framer-motion";

// Import other components as needed


const HomeScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  const isSmallScreen = useMediaQuery({ maxWidth: 1400 });

  // Function to retrieve token from cookie
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
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
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  // Function to fetch user data
const fetchUserData = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/get-user`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      setUserData(data.user);
    } else if (response.status === 404) {
      // If the request is unauthorized, log the user out
      console.log('Unauthorized. Logging user out.');
      setIsAuthenticated(false);
      setUserData(null);
      // Optionally, you can clear the token from cookies or local storage
      clearToken();
      window.location.reload();
    } else {
      console.error('Failed to fetch user data');
      setIsAuthenticated(false);
      setUserData(null);
      // Optionally, you can clear the token from cookies or local storage
      clearToken();
      window.location.reload();
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    setIsAuthenticated(false);
      setUserData(null);
      // Optionally, you can clear the token from cookies or local storage
      clearToken();
      window.location.reload();
  }
};

  return (
    <div className="home-screen-page">
      <Header>
        {/* Logo on the left */}
        <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 1.0 }} // Transition duration
        ><ImageLogo /></motion.div>
        

        {/* Header text in the middle */}
        
        <HeaderText />

        {/* Conditional rendering for authentication */}
        {isAuthenticated ? (
  // Render image profile and dashboard button if authenticated
  <>
    <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.0 }} // Transition duration
        ><ButtonDashboard /></motion.div>
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px' }}>
            {/* ImageProfile */}
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.0 }} // Transition duration
        ><ImageProfile userData={userData} /></motion.div>
              
            </div>
            {/* TextUsername */}
            <div style={{ textAlign: 'center', marginTop: '10px', marginRight: '20px' }}> {/* Ensure TextUsername is centered */}
            <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 1.0 }} // Transition duration
        ><TextUsername userData={userData} /></motion.div>
            </div>
          </div>
  </>
        ) : (
          // Render sign-in button if not authenticated
          <>
          <motion.div
      initial={{ scale: 0 }} // Initial scale is 0
      animate={{ scale: 1 }} // Animate to scale 1
      whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
      transition={{ duration: 1.0 }}
      style={{ width: 100, height: 100, border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <TextGetStarted />
    </motion.div>
            
    <motion.div
      initial={{ scale: 0 }} // Initial scale is 0
      animate={{ scale: 1 }} // Animate to scale 1
      whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
      transition={{ duration: 1.0 }}
      style={{ width: 200, height: 100, border: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ButtonSignIn />
    </motion.div>
          </>
        )}
      </Header>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {!isSmallScreen && ( 
        <div style={{ flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 1.0 }} // Transition duration
        >
          <ImageJumbotron />
        </motion.div>
        </div>)}

        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
          <TextMainHeader />
          <TextMainBody />
        </div>
      </div>
      
      <Card>
        <CardText />
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  {/* First Column */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <ButtonTheChallenge />
    <TextTheChallengeHeader />
    <TextTheChallengeBody />
  </div>

  {/* Second Column */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <ButtonTheOpportunity />
    <TextTheOpportunityHeader />
    <TextTheOpportunityBody />
  </div>

  {/* Third Column */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <ButtonTheSolution />
    <TextTheSolutionHeader />
    <TextTheSolutionBody />
  </div>
</div>

    <div>
      <CardBackground>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
    <CardBackgroundHeader />
  </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  {/* First Column */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Circle1>
      <IconCircle1 />
    </Circle1>
    <TextCircle1Header />
    <TextCircle1Body />
  </div>

  {/* Second Column */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Circle2>
      <IconCircle2 />
    </Circle2>
    <TextCircle2Header />
    <TextCircle2Body />
  </div>

  {/* Third Column */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Circle3>
      <IconCircle3 />
    </Circle3>
    <TextCircle3Header />
    <TextCircle3Body />
  </div>
</div>
      </CardBackground>
    </div>

    <CardFooter>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <ImageLogoFooter />
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextFooterContactUs />
      <IconFooterContactus />
    </div>
  </div>

  <div style={{ display: 'flex', alignItems: 'center' }}>
    <TextFooterTermsOfUse />
    <VerticalDividerFooter />
    <TextFooterPrivacyPolicy />
  </div>
</CardFooter>
  </div>
  );
};

export default HomeScreen;