import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import logo from '../../assets/main-logo.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const headerNav = [  {    display: 'Home',    path: '/',  },  {    display: 'Movies',    path: '/movie',  },  {    display: 'Shows',    path: '/tv',  },];

if (localStorage.getItem("loggeduser") !== null) {
  headerNav.splice(1, 0, {
    display: 'Favorites',
    path: '/favorites',
  });
}

const Header = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [loggeduseremail,setLogedduseremail] = useState(localStorage.getItem("loggeduser"))
  const [loggeduser,setLogedduser] = useState()
  const active = headerNav.findIndex((e) => e.path === pathname);
  const logoutHandler = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("loggeduser")
    localStorage.removeItem("userid")
    window.location.reload()
    setIsOpen(false);
  }
  const loginHandler = () => {
    navigate('/login')
  }
  useEffect(() => {
    // axios.get(`http://localhost:5001/users/loggeduser?email=${loggeduseremail}`).then(res=>{setLogedduser(res.data.user)})
    const loguser = localStorage.getItem("loggeduser")
    console.log(loguser);
    
    setLogedduser(loguser);
    console.log(localStorage.getItem("loggeduser"))
    console.log(loggeduser);
    
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  
  return (
    <div ref={headerRef} className='header'>
      <div className='header__wrap container'>
        <div className='logo'>
          <img src={logo} alt='MyMovies' />
          <Link to='/'>Your Movies</Link>
        </div>
        <ul className='header__nav'>
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
        <div className='header__nav'>
          {token == null ? (
            <li className='login' onClick={loginHandler}>
              <i className="bi bi-box-arrow-in-left"></i> Login 
            </li>
          ) : (
            <div className="dropdown">
              <div className="dropdown__toggle" onClick={handleToggle}>
                <i className="bi bi-person-circle"></i><l1>Hi, {loggeduseremail}</l1>
              </div>
              {isOpen && (
                <div className="dropdown__menu">
                  <li className="signout" onClick={logoutHandler}>
                    Logout <i className="bi bi-box-arrow-right"></i>
                  </li>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Header;