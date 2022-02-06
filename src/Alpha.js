import React, {useRef, useEffect} from "react";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import strawberry from "./images/strawberry.jpg";
import coffeebean from "./images/coffeebean.jpg";
import peak from "./images/peak.jpg";
import forest from "./images/forest.jpg";
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
          end: "+=100vh", /*100%*/
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
          end: "+=100vh", /*100%*/
          scrub: 0.5,
        }
    });
  },[]);
  
  return (
    <div className="alphaPage">
      <section className="alphaRevealer" ref={ref}>
        <div className="alphaMask">
          <img src={coffeebean} alt="coffeebean"/>
        </div>
        <div className="alphaMask">
          <img src={strawberry} alt="strawberry"/>
        </div>
        <div className="alphaOverlay">
          Sweetness VS Bitterness
        </div>
      </section>
      <section className="alphaContent">
        Next is coming...
      </section>
      <section className="alphaRevealer2" ref={ref2}>
        <div className="alphaMask2">
          <img src={forest} alt="forest"/>
        </div>
        <div className="alphaMask2">
          <img src={peak} alt="peak"/>
        </div>
        <div className="alphaOverlay2">
          Aloofness VS Vitality
        </div>
      </section>
      <section className="alphaContent2">
        Thank you...
      </section>
    </div>
  );
}
export default Alpha;