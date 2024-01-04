import React from "react";
export const CloseIconWhite = ({
  icon,
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 26 26"
    width={width || size}
    {...props}
    
  >
    <path
      d="M25.9996 1.52702L14.5268 12.9999L25.9996 24.4728L24.4726 25.9996L12.9999 14.5269L1.52709 25.9996L0 24.4728L11.4728 12.9999L0 1.52702L1.52695 0.000221252L12.9997 11.473L24.4726 0.000221252L25.9996 1.52702Z"
      fill="white"
    />
  </svg>
);
