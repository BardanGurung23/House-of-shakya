"use client";
import { TypeAnimation } from "react-type-animation";
import "../../home.scss";

export default function TypeAnimations({ heading }: { heading: string }) {
  return (
    <TypeAnimation
      sequence={[`${heading}`, 1000]}
      speed={40}
      cursor={false}
      className="animation-text"
    />
  );
}
