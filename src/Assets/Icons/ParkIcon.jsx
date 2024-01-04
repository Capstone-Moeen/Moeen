import React from "react";
export const ParkIcon = ({
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
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M16.7635 27H11.1008V21.6H0.86438L6.6723 13.5H3.76834L13.9322 0L24.096 13.5H21.1921L27 21.6H16.7635V27Z"
      fill="#005B41"
    />
  </svg>
);
