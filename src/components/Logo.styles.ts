import styled from "styled-components";
import { Colors } from "../utils/constants";

const lineAnim = "progress 3s linear normal infinite";

export const SVGWrapper = styled.div`
  #logo {
    background-color: color-mix(in srgb, ${Colors.DARK} 80%, transparent);
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  #logo .ring {
    animation: ${lineAnim};
    fill: none;
    stroke-dasharray: 720 180;
  }

  #logo .left {
    transform: translate(100px, 0) rotate(90deg);
  }

  #logo .right {
    animation-delay: 1.5s;
    animation-direction: reverse;
    transform: translate(100px, 200px) rotate(-90deg);
  }

  @keyframes progress {
    0%,
    10% {
      stroke-dashoffset: 100;
    }

    90%,
    100% {
      stroke-dashoffset: -900;
    }
  }
`;
