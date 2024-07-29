import React from 'react';
import './Footer.css';

import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, odio. Itaque molestias aspernatur vitae quod amet optio dolore odit necessitatibus, delectus repellat, libero suscipit ducimus repudiandae cupiditate, ad voluptatum culpa corporis nihil enim modi. Eius sint aperiam et voluptates. Velit labore nisi sequi repellat et nemo enim suscipit libero impedit!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+2348102525792</li>
                    <li>alagbeolalekan1000@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Project by Olalekan Alagbe - Courtesy of GreatStack</p>
    </div>
  )
}

export default Footer