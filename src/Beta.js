import React, {useEffect} from "react";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import grass from "./images/grass.jpg";
import grassbw from "./images/grassbw.jpg";
import "./Beta.css";

function Beta() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(()=>{
    gsap.utils.toArray(".comparisonSection").forEach(section => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => "+=" + section.offsetWidth, 
          scrub: true,
          pin: true,
          anticipatePin: 1
        },
        defaults: {ease: "none"}
      });
      tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: 0})
        .fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
    });

  },[]);
  return (
    <div className="betaPage">
      <h1 className="header-section">What we want to see?</h1>
      <section className="comparisonSection">
        <div className="comparisonImage beforeImage">
            <img src={grassbw} alt="before"/>
        </div>
        <div className="comparisonImage afterImage">
            <img src={grass} alt="after"/>
        </div>
      </section>
      <h1 className="header-section">Memorize the past to look forward...</h1>
    </div>
  )
}
export default Beta;