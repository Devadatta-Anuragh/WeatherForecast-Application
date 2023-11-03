import React from 'react';
import bgVideo from "../images/backgroundvideo.mp4";

export default function VideoComponent(){
return(
    <div className='appl'>
        <video autoPlay loop muted >
          <source src={bgVideo}  type="video/mp4" />
        </video>
    </div>
)
}