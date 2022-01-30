import React, {useRef, useEffect} from "react";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import strawberry from "./images/strawberry.jpg";
import coffeebean from "./images/coffeebean.jpg";
import grass from "./images/grass.jpg";
import grassbw from "./images/grassbw.jpg";
import "./Alpha.css";

function Alpha() {
  gsap.registerPlugin(ScrollTrigger);
  const ref=useRef();
  const ref2=useRef();
  useEffect(()=>{   
    let mask = gsap.utils.toArray(".alphaMask");
    gsap.to(mask[1],{
        height: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: ".alphaRevealer",
          start: "top top",
          pin: true,
          end: "+=100%",
          scrub: 0.5,
        }
    });
    let mask2 = gsap.utils.toArray(".alphaMask2");
    gsap.to(mask2[1],{
        height: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: ".alphaRevealer2",
          start: "top top",
          pin: true,
          end: "+=100%",
          scrub: 0.5,
        }
    });

  },[]);
  
  return (
    <div className="alphaPage">
      <section className="alphaRevealer" ref={ref}>
        <div className="alphaMask">
          <img src={coffeebean} alt="boat"/>
        </div>
        <div className="alphaMask">
          <img src={strawberry} alt="wave"/>
        </div>
        <div className="alphaOverlay">
          Our life needs delicious
        </div>
      </section>
      <section className="alphaContent">
        Next is coming...
      </section>
      <section className="alphaRevealer2" ref={ref2}>
        <div className="alphaMask2">
          <img src={grass} alt="grass"/>
        </div>
        <div className="alphaMask2">
          <img src={grassbw} alt="grassbw"/>
        </div>
        <div className="alphaOverlay2">
          Our world is colorful
        </div>
      </section>
      <section className="alphaContent2">
        Thank you...
      </section>
    </div>
  );
}
export default Alpha;