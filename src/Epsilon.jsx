import React from 'react';
import "./Epsilon.css";
import bgvideo from "./images/videoplayback.mp4"

function Epsilon() {
  return (
    <div className="epsilonPage">
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
      
      <div><p>heloo</p></div>
      <div><p>heloo</p></div>
      <div><p>heloo</p></div>
      <div><p>heloo</p></div>
      <div><p>heloo</p></div>
      <div><p>heloo</p></div>
      <div><p>heloo</p></div>
    </div>
  )
}
export default Epsilon;