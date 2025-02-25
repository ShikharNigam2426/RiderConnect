import React from 'react';
import styled from 'styled-components';
import AOS from "aos";
import "aos/dist/aos.css";
import '../Fonts.css'

const Feature = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 1000, 
      offset: 100, 
      once: false, 
    });
  }, []);

  return (
    <FeatureComponent>
      <div className="content">
        <h1 data-aos="fade-up" data-aos-delay="200">Why Choose <span className='ubuntu-medium'>RiderConnect?</span></h1>
        <div className="feature-list">
          <div className="feature" data-aos="fade-up" data-aos-delay="400">&#x2705; <span>Easy Ride Creation & Join Option</span></div>
          <div className="feature" data-aos="fade-up" data-aos-delay="600">&#x2705; <span>Ride History & Reviews</span></div>
          <div className="feature" data-aos="fade-up" data-aos-delay="800">&#x2705; <span>Real-Time Ride Connectivity</span></div>
          <div className="feature" data-aos="fade-up" data-aos-delay="1000">&#x2705; <span>Live Tracking & Navigation</span></div>
        </div>
      </div>
    </FeatureComponent>
  );
};

const FeatureComponent = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative; 

    background: url('./assets/ninja400.jpg') no-repeat center center;
    background-attachment: fixed;
    background-size: cover;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5); 
        z-index: 1; 
    }

    .content {
        position: relative;
        z-index: 2;
        text-align: center;
        color: white;
        padding: 20px;
        max-width: 800px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    h1 {
        font-size: 2.5vw;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        margin-bottom: 15px;
        color: white;
    }

    h1 span {
        color: #2dfb1a;
    }

    .feature-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        gap: 10px;
    }

    .feature {
        display: flex;
        align-items: center;
        font-size: 1.3vw;
        font-family: 'Poppins', sans-serif;
        color: white;
        background: rgba(255, 255, 255, 0.1);
        padding: 10px 15px;
        border-radius: 8px;
        width: 100%;
        max-width: 500px;
        transition: all 0.3s ease-in;
        border: 1px solid white;
    }

    .feature:hover {
        background: rgba(28, 25, 25, 0.5);
        transform: translateX(10px);
    }

    .feature span {
        font-weight: 500;
        margin-left: 10px;
        color: white;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 4vw;
        }
        .feature {
            font-size: 3vw;
            padding: 8px 12px;
        }
    }
`;

export default Feature;
