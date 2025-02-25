import React from 'react'
import styled from 'styled-components'
import '../Fonts.css'
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {

    React.useEffect(() => {
        AOS.init({
          duration: 1000, // Animation speed (ms)
          offset: 100, // Kitna scroll hone pe start ho
          once: false, // Ek baar hi chale (false hoga toh baar-baar chalega)
        });
      }, []);

    return (
        <HeroComponent className='ubuntu-medium'>
            <h1 data-aos="fade-down" className='ubuntu-medium'>Welcome To <span className='kaushan-script-regular span'>RiderConnect!!</span></h1>
            <p data-aos="fade-up" data-aos-delay="1000">Meet, Connect, Ride</p>  
        </HeroComponent>
    )
}

const HeroComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .span{
    color: #2dfb1a;
  }

  h1{
    font-size: 5vw;
  }

  p{
    font-size: 2vw;
  }

  * {
      position: relative;
      z-index: 2;
  }

  background: url('./assets/road.jpg')no-repeat center center;
  background-attachment: fixed;
  background-size: cover;

  &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4); /* Dark overlay */
      z-index: 1; /* Overlay ka z-index kam rakho */
  }
`;

export default Hero