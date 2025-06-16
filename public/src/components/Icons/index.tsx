"use client";
import React, { createElement } from "react";
import * as MaterialIcon from "react-icons/fa";
export default function Icons({ icon, className, size }) {
  const mdIcon = MaterialIcon[icon];
  return (
    <div className={className}>
      {/* <mdIcon /> */}
      {React.createElement(mdIcon, { size })}
    </div>
  );
}
