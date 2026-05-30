"use client";
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledWrapper = styled.div`
  .button {
    position: relative;
    overflow: hidden;
    height: 3rem;
    padding: 0 2rem;
    border-radius: 1.5rem;
    background: #3d3a4e;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: color 0.475s; /* Smooth transition for text color */
  }

  .button:hover {
    color: #fff; /* Maintain text color on hover */
  }

  .button-content {
    position: relative;
    z-index: 1; /* Ensure button text is above the pseudo-element */
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    width: 100%;
    height: inherit;
    border-radius: inherit;
    background: linear-gradient(
      82.3deg,
      rgba(150, 93, 233, 1) 10.8%,
      rgba(99, 88, 238, 1) 94.3%
    );
    transition: all 0.475s; /* Transition for the pseudo-element */
    z-index: 0; /* Ensure it is behind the button text */
  }

  .button:hover::before {
    transform: scaleX(1); /* Scale effect on hover */
  }
`;

const Button = () => {
  return (
    <StyledWrapper>
      <Link
        href="/dashboard"
        className="button flex items-center justify-center bg-gradient-to-r from-blue-300 to-blue-500 mx-3 rounded-md"
      >
        <span className="button-content">Get Started</span>
      </Link>
    </StyledWrapper>
  );
};

export default Button;
