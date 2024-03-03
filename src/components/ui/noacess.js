import React from "react";

export default function NoaccessIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="black"
        d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m0 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14"
        className="clr-i-outline clr-i-outline-path-1"
      ></path>
      <path
        fill="black"
        d="M27.15 15H8.85A1.85 1.85 0 0 0 7 16.85v2.29A1.85 1.85 0 0 0 8.85 21h18.3A1.85 1.85 0 0 0 29 19.15v-2.3A1.85 1.85 0 0 0 27.15 15m.25 4.15a.25.25 0 0 1-.25.25H8.85a.25.25 0 0 1-.25-.25v-2.3a.25.25 0 0 1 .25-.25h18.3a.25.25 0 0 1 .25.25Z"
        className="clr-i-outline clr-i-outline-path-2"
      ></path>
      <path fill="none" d="M0 0h36v36H0z"></path>
    </svg>
  );
}
