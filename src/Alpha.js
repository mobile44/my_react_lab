import React, {useRef, useEffect, useState, forwardRef, useImperativeHandle} from "react";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import strawberry from "./images/strawberry.jpg";
import coffeebean from "./images/coffeebean.jpg";
import "./Alpha.css";

const Box = forwardRef(({size, value},ref) => {
  const el = useRef();
      
  useImperativeHandle(ref, () => {           
      
      return {
        moveTo(width) {
          gsap.fromTo(el.current, {x:0},{
            x:width-20,
            repeat:-1,
            duration: 4,
            stagger: 0.33,
            yoyo: true,
          });
        }
      };
  },[value]); 
  return <div className="distanceBox" ref={el}>{size}</div>;
});

function Alpha() {
  gsap.registerPlugin(ScrollTrigger);
  const ref=useRef();
  useEffect(()=>{
    const el = ref.current;   
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
          Image Reveal on Scroll
        </div>
      </section>
      <section className="alphaContent">
        More photos coming...
      </section>
    </div>
  );
}
export default Alpha;