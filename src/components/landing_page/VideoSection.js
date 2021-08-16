import React from "react";
import "./VideoSection.css";
import Login from "../login/Login";

export default function VideoSection(props) {
  return (
    <div className="video-container">
      <video
        src="/video/video-3.mp4"
        autoPlay
        loop
        muted
        data-setup='{ "playbackRates": [0.5, 1, 1.5, 2] }'
      />
      <div className="message">
        {props.trigger ? <Login trigger={props.trigger} /> : ""}
      </div>
    </div>
  );
}
