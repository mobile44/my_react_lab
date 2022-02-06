import React, {useState, useEffect} from 'react';
import {BrowserRouter,Route,Routes,Link} from "react-router-dom";
import './App.css';
import Alpha from './Alpha';
import Beta from './Beta';
import Gamma from './Gamma';
import Delta from './Delta';

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
  const collapseNav = () => {
    if (toggleMenu) {
      setToggleMenu(!toggleMenu);
      setNavWidth({width: "150px"});
      setContentWidth({marginLeft: "150px"});
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
    <div>
    {(screenWidth>=900) && (
      <BrowserRouter>
        <div className="appBody">
          <div id="appNav" className="appNav" style={navwidth}>
            <button className="navbtn" onClick={toggleNav}>&#9776;</button>
            <Link to="/my_react_lab" onClick={collapseNav}>&#913;{toggleMenu?"--Alpha":""}</Link>
            <Link to="/my_react_lab/beta" onClick={collapseNav}>&#914;{toggleMenu?"--Beta":""}</Link>
            <Link to="/my_react_lab/gamma" onClick={collapseNav}>&#915;{toggleMenu?"--Gamma":""}</Link>
            <Link to="/my_react_lab/delta" onClick={collapseNav}>&#916;{toggleMenu?"--Delta":""}</Link>
            <Link to="/">&#917;{toggleMenu?"--Epsilon":""}</Link>
            <Link to="/">&#918;{toggleMenu?"--Zeta":""}</Link>
            <Link to="/">&#919;{toggleMenu?"--Eta":""}</Link>
            <Link to="/">&#920;{toggleMenu?"--Theta":""}</Link>
          </div>
          <div id="appContent" className="appContent" style={contentwidth}>
              <Routes>
              <Route path="/" element={<Alpha />} />
              <Route path="/my_react_lab/" element={<Alpha />} />
              <Route path="/my_react_lab/beta" element={<Beta />} />
              <Route path="/my_react_lab/gamma" element={<Gamma />} />
              <Route path="/my_react_lab/delta" element={<Delta />} />
              </Routes>
          </div>
        </div>
      </BrowserRouter>
    )}
    </div>
  );
}

export default App;
