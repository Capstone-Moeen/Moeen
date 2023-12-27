import React from "react";
export const FavoriteIcon = ({
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
    viewBox="0 0 30 30"
    width={width || size}
    {...props}
  >
    <path d="M5.41425 15.0593L15 25L24.5858 15.0593C25.6514 13.9541 26.25 12.4554 26.25 10.8926C26.25 7.63819 23.706 5 20.5679 5C19.0609 5 17.6156 5.62083 16.55 6.72589L15 8.33334L13.45 6.72589C12.3844 5.62083 10.9391 5 9.43211 5C6.29396 5 3.75 7.63819 3.75 10.8926C3.75 12.4554 4.34865 13.9541 5.41425 15.0593Z" stroke="black" stroke-width="2.496" stroke-linecap="round" stroke-linejoin="round"/>

  </svg>
);
