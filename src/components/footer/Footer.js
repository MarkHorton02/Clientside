import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import bg from '../../assets/footer-background.jpg';
import logo from '../../assets/main-logo.png';

const Footer = () => {
  return (
    <div className='footer'   style={{ 
      backgroundImage: `url(${bg})`, 
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backgroundBlendMode: 'overlay', 
    }}>
      <div className='footer__content container'>
        <div className="footer_transparent">
          <div className='footer__content__logo'>
            <div className='logo'>
              <img src={logo} alt='mymovies'/>
              <Link to='/'>Your Movies</Link>
            </div>
          </div>
          <div className='footer__content__menus'>
            <div className='footer__content__menu'>
              <Link to='/'>Home</Link>
              <Link to='/movie'>Movies</Link>
              <Link to='/tv'>TV Shows</Link>
            </div>
            <div className='footer__content__menu'>
              <Link to='/'>FAQ</Link>
              <Link to='/'>Terms of Service</Link>
              <Link to='/'>Privacy policy</Link>
            </div>
            <div className='footer__content__menu'>
              <Link to='/'>Mark Horton</Link>
              <Link to='/'>Chris Cade</Link>
              <Link to='/'>Kyle Lawrenson</Link>
              <Link to='/'>Liam Armstrong</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
