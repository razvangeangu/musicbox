/**
 *
 * ProgressnIndicator
 *
 */
import React from 'react';
import styled, { css, keyframes } from 'styled-components/macro';

export interface ProgressIndicatorProps {
  className?: string;
}

export default function ProgressIndicator({
  className,
}: ProgressIndicatorProps) {
  return (
    <Spinner className={className}>
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
      <SpinnerBlade />
    </Spinner>
  );
}

const Spinner = styled.div`
  display: inline-block;
  height: 1rem;
  position: relative;
  width: 1rem;
`;

const spinnerFade = keyframes`
  0% {
    background-color: var(--systemSecondary);
  }

  100% {
    background-color: transparent;
  }
`;

const SpinnerBlade = styled.div`
  animation: ${spinnerFade} 1s infinite linear;
  background-color: transparent;
  border-radius: 0.0555rem;
  bottom: 0;
  height: 0.2777rem;
  left: 0.4629rem;
  position: absolute;
  transform-origin: center -0.2222rem;
  width: 0.074rem;

  ${Array(12)
    .fill(0)
    .map(
      (_, i) => css`
        :nth-child(${i}) {
          animation-delay: ${0.083 * i + 1}s;
          transform: rotate(${30 * i}deg);
        }
      `,
    )}
`;
