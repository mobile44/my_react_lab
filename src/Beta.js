import React, {useEffect} from "react";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import grass from "./images/grass.jpg";
import grassbw from "./images/grassbw.jpg";
import "./Beta.css";

function Beta() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(()=>{
    gsap.utils.toArray(".betaSection").forEach(section => {
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
      tl.fromTo(section.querySelector(".betaAfter"), { xPercent: 100, x: 0}, {xPercent: 0})
        .fromTo(section.querySelector(".betaAfter img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
    });

  },[]);
  return (
    <div className="betaPage">
      <p className="betaP">What we want to see?</p>
      <section className="betaSection">
        <div className="betaImage betaBefore">
            <img src={grassbw} alt="before"/>
        </div>
        <div className="betaImage betaAfter">
            <img src={grass} alt="after"/>
        </div>
      </section>
      <p className="betaP">Memorize the past to look forward...</p>
    </div>
  )
}
export default Beta;