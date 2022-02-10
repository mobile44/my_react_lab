import React, {useEffect} from 'react';
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import "./Epsilon.css";
import bgvideo from "./images/videoplayback.mp4"

function Epsilon() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(()=>{
    ScrollTrigger.create({
      trigger: "#b",
      start: "top center", //element viewport
      end: "center 350px", //element viewport
      pin: "#bb",
      //markers: true,
    });
    ScrollTrigger.create({
      trigger: "#c",
      start: "top center", //element viewport
      end: "center 350px", //element viewport
      pin: "#cc",
      //markers: true,
    });
    ScrollTrigger.create({
      trigger: "#d",
      start: "top center", //element viewport
      end: "center 350px", //element viewport
      pin: "#dd",
      //markers: true,
    });
  })
  return (
    <div className="epsilonPage">
      <div className="epsilonGreen">
      <div className="epsilonContainer">
        <video
          src={bgvideo}
          controls={0}
          autoPlay={1}
          loop={1}
          muted={1}
          title='A youtube video on React hooks'
          className="epsilonVideo"
        >
        </video>
        <div className="epsilonText">
          <h1>Activities under the water</h1>
          <p>What a beautiful world</p>
        </div>
      </div>
      </div>
      <section id="a" className="epsilonSection epsilonOrange"><p id="aa">First Section - Pin is next</p></section>
      <section id="b" className="epsilonSection epsilonPink"><p id="bb"> Second Section - Pin now</p></section>
      <section id="c" className="epsilonSection epsilonPurple"><p id="cc">Third Section - Pin now</p></section>
      <section id="d" className="epsilonSection epsilonRed"><p id="dd">Fourth Section - Pin now</p></section>
      <section id="e" className="epsilonSection epsilonGrey"><p id="ee">Fifth Section - Pin is over</p></section>
    </div>
  )
}
export default Epsilon;