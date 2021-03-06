import React, {useState, useEffect} from 'react';
import {BrowserRouter,Route,Routes,Link} from "react-router-dom";
import './App.css';
import Alpha from './Alpha';
import Beta from './Beta';
import Gamma from './Gamma';
import Delta from './Delta';
import Epsilon from './Epsilon';
import Zeta from './Zeta';

function App() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [navwidth, setNavWidth] = useState({width: "150px"});
  const [contentwidth, setContentWidth] = useState({marginLeft: "150px"});
  const [mtoggleMenu, setMToggleMenu] = useState(false);
  const [mnavWidth, setMNavWidth] = useState({width: "0px"});
  
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
  const mtoggleNav = () => {
    setMToggleMenu(!mtoggleMenu);
    if (mtoggleMenu) {
      setMNavWidth({width: "0px"});
    } else {
      setMNavWidth({width: "180px"});
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
            <Link to="/my_react_lab/epsilon" onClick={collapseNav}>&#917;{toggleMenu?"--Epsilon":""}</Link>
            <Link to="/my_react_lab/zeta" onClick={collapseNav}>&#918;{toggleMenu?"--Zeta":""}</Link>
          </div>
          <div id="appContent" className="appContent" style={contentwidth}>
              <Routes>
              <Route path="/" element={<Alpha />} />
              <Route path="/my_react_lab/" element={<Alpha />} />
              <Route path="/my_react_lab/beta" element={<Beta />} />
              <Route path="/my_react_lab/gamma" element={<Gamma />} />
              <Route path="/my_react_lab/delta" element={<Delta />} />
              <Route path="/my_react_lab/epsilon" element={<Epsilon />} />
              <Route path="/my_react_lab/zeta" element={<Zeta winWidth={screenWidth}/>} />
              </Routes>
          </div>
        </div>
      </BrowserRouter>
    )}
    {(screenWidth<900) && (
      <BrowserRouter>
        <div className="mappBody">
          <div className="mappNav" style={mnavWidth}>
            <Link to="/my_react_lab" onClick={mtoggleNav} id="Alpha">&#913;--Alpha</Link>
            <Link to="/my_react_lab/beta" onClick={mtoggleNav} id="Beta">&#914;--Beta</Link>
            <Link to="/my_react_lab/gamma" onClick={mtoggleNav} id="Gamma">&#915;--Gamma</Link>
            <Link to="/my_react_lab/delta" onClick={mtoggleNav} id="Delta">&#916;--Delta</Link>
            <Link to="/my_react_lab/epsilon" onClick={mtoggleNav} id="Epsilon">&#917;--Epsilon</Link>
            <Link to="/my_react_lab/zeta" onClick={mtoggleNav} id="Zeta">&#918;--Zeta</Link>
          </div>
          <div className="mappNavbtnsection">
          <button className="mnavbtn" onMouseOver={mtoggleNav}>&#9776;</button>
          </div>

          <div className="mappContent">
            <Routes>
              <Route path="/" element={<Alpha />} />
              <Route path="/my_react_lab/" element={<Alpha />} />
              <Route path="/my_react_lab/beta" element={<Beta />} />
              <Route path="/my_react_lab/gamma" element={<Gamma />} />
              <Route path="/my_react_lab/delta" element={<Delta />} />
              <Route path="/my_react_lab/epsilon" element={<Epsilon />} />
              <Route path="/my_react_lab/zeta" element={<Zeta winWidth={screenWidth}/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    )}
    </div>
  );
}

export default App;
