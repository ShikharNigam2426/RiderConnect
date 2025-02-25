import React from 'react'
import styled from 'styled-components'
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const ToggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    React.useEffect(() => {
        AOS.init({
            duration: 1000, // Animation speed (ms)
            offset: 100, // Kitna scroll hone pe start ho
            once: true, // Ek baar hi chale (false hoga toh baar-baar chalega)
        });
    }, []);

    return (
        <NavComponent>
            <div className="left top ml-5">
                <ul>
                    <li><a data-aos="fade-down" href="/">Home</a></li>
                    <li><a data-aos="fade-down" data-aos-delay="200" href="/">Active Rides</a></li>
                    <li><a data-aos="fade-down" data-aos-delay="400" href="/">Ride History</a></li>
                </ul>
            </div>
            <div className="middle top" data-aos="fade-down" data-aos-delay="600">
                <img src="./assets/logo.jpg" className='logo' alt="" />
            </div>
            <div className="right top mr-5">
                <Link to='/register'>
                    <button className='btn btn-outline-light mx-2' data-aos="fade-down" data-aos-delay="800">Register</button>
                </Link>
                <Link to={'/createRide'}>
                    <button className='btn btn-success' data-aos="fade-down" data-aos-delay="1000">Create Ride</button>
                </Link>
            </div>
            <div className="hamburger top mr-3">
                <button className="btn btn-outline-light" onClick={ToggleNavbar}>☰</button>
            </div>
            <MobileNavBar className={isOpen ? 'open' : ''}>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Active Rides</a></li>
                    <li><a href="/">Ride History</a></li>
                    <li><Link to='/register'><a href="/">Register</a></Link></li>
                    <Link to={'/createRide'}>
                        <li><a href="/">Create Ride</a></li>
                    </Link>
                </ul>
            </MobileNavBar>
        </NavComponent>
    )
}

const NavComponent = styled.div`
    width: 100vw;
    height: 80px;
    color: white;
    position: fixed;
    top: 0;
    background-color: #0e0d0d39;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    z-index: 1000;
 
    .left > ul{
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 20px;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .left > ul > li{
        transition: all 0.3s ease-in-out;
    }

    .left > ul > li:hover{
        transform: translateY(-5px);
    }

    .top{
        z-index: 100 !important;
    }

    a{
        text-decoration: none;
        color: white;
    }

    .logo{
        width: 80px;
        border-radius: 15%;
        cursor: pointer;
    }

    .hamburger{
        display: none;
    }

    @media (max-width: 768px){
        .left, .right {
            display: none;
        }
        .hamburger{
            display: block;
        }

        .logo{
        width: 65px;
        border-radius: 15%;
        cursor: pointer;
        margin-left: 15px;
    }

    }
`;

const MobileNavBar = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100vh);
    transition: transform 0.5s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ul {
        list-style: none;
        padding: 0;
        text-align: center;
    }

    ul li {
        margin: 15px 0;
        font-size: 20px;
    }

    a {
        text-decoration: none;
        color: black;
        font-weight: bold;
    }

    &.open {
        transform: translateY(0);
    }

    @media (min-width: 769px) {
        display: none;
    }
`;

export default Navbar;
