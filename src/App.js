import React, {useState, useEffect} from 'react';
import {BrowserRouter,Route,Routes,Link} from "react-router-dom";
import './App.css';
import Alpha from './Alpha';
import Beta from './Beta';
import Gamma from './Gamma';

function App() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [navwidth, setNavWidth] = useState({width: "150px"});
  const [contentwidth, setContentWidth] = useState({marginLeft: "150px"});
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
    if (toggleMenu) {
      setNavWidth({width: "150px"});
      setContentWidth({marginLeft: "150px"});
    } else {
      setNavWidth({width: "200px"});
      setContentWidth({marginLeft: "200px"});
    }
  }
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth);

    return () => {
      window.removeEventListener('resize', changeWidth);
    }
  },[])
  return (
    <BrowserRouter>
      <div className="appBody">
        <div id="appNav" className="appNav" style={navwidth}>
          <button className="navbtn" onClick={toggleNav}>&#9776;</button>
          <Link to="/">&#913;{toggleMenu?"--Alpha":""}</Link>
          <Link to="/beta">&#914;{toggleMenu?"--Beta":""}</Link>
          <Link to="/gamma">&#915;{toggleMenu?"--Gamma":""}</Link>
          <Link to="/">&#916;{toggleMenu?"--Delta":""}</Link>
          <Link to="/">&#917;{toggleMenu?"--Epsilon":""}</Link>
          <Link to="/">&#918;{toggleMenu?"--Zeta":""}</Link>
          <Link to="/">&#919;{toggleMenu?"--Eta":""}</Link>
          <Link to="/">&#920;{toggleMenu?"--Theta":""}</Link>
        </div>
        <div id="appContent" className="appContent" style={contentwidth}>
          <Routes>
            <Route path="/" element={<Alpha />} />
            <Route path="/my_react_lab/" element={<Alpha />} />
            <Route path="/beta" element={<Beta />} />
            <Route path="/gamma" element={<Gamma />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
